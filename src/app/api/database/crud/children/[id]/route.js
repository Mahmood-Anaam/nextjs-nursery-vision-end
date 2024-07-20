import { NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 *  @method  GET
 *  @route   ~/api/database/crud/children/:id
 *  @desc    Get all children along with their face photos
 *  @access  public
 */
export async function GET(request, { params }) {
  try {
    const children = await prisma.child.findMany({
      where: { parentId: parseInt(params.id) },
    });
    return NextResponse.json(children, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *  @method  PUT
 *  @route   ~/api/database/crud/children/:id
 *  @desc    Update a child and their face photos
 *  @access  public
 */
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { name, gender, age, checkIn, checkOut, parentId, facePhotos } = body;

    const updatedChild = await prisma.child.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        gender,
        age,
        checkIn,
        checkOut,
        parentId,
        facePhotos: {
          deleteMany: {},
          create: facePhotos.map((photo) => ({
            photo: photo,
          })),
        },
      },
    });
    return NextResponse.json(updatedChild, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *  @method  DELETE
 *  @route   ~/api/database/crud/children/:id
 *  @desc    Delete a child and all their associated face photos
 *  @access  public
 */
export async function DELETE(request, { params }) {
  try {
    const child = await prisma.child.findUnique({
      where: { id: parseInt(params.id) },
      include: { facePhotos: true },
    });

    const facePhotoIds = child.facePhotos.map((facePhoto) => facePhoto.id);
    await prisma.facePhoto.deleteMany({
      where: {
        id: { in: facePhotoIds },
      },
    });
    await prisma.child.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: "child deleted" }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
