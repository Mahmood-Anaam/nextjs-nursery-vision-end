import { NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 *  @method  GET
 *  @route   ~/api/database/crud/facePhotos/:id
 *  @desc    Get all face photos
 *  @access  public
 */
export async function GET(request, { params }) {
  try {
    const facePhotos = await prisma.facePhoto.findMany({
      where: { childId: parseInt(params.id) },
    });
    return NextResponse.json(facePhotos, { status: 200 });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *  @method  PUT
 *  @route   ~/api/database/crud/facePhotos/:id
 *  @desc    Update a face photo
 *  @access  public
 */
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { photo, childId } = body;

    const updatedFacePhoto = await prisma.facePhoto.update({
      where: { id: parseInt(params.id) },
      data: {
        photo,
        childId,
      },
    });
    return NextResponse.json(updatedFacePhoto, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *  @method  DELETE
 *  @route   ~/api/database/crud/facePhotos/:id
 *  @desc    Delete a face photo
 *  @access  public
 */
export async function DELETE(request, { params }) {
  try {
    await prisma.facePhoto.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json(
      { message: "face photo deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
