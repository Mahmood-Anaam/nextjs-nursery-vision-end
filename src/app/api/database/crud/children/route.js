import { NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 *  @method  GET
 *  @route   ~/api/database/crud/children
 *  @desc    Get all children along with their face photos
 *  @access  public
 */
export async function GET(request) {
  try {
    const children = await prisma.child.findMany({
      include: {
        facePhotos: true,
      },
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
 *  @method  POST
 *  @route   ~/api/database/crud/children
 *  @desc    Create a new child with face photos
 *  @access  public
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, gender, age, checkIn, checkOut, parentId, facePhotos } = body;
    const newChild = await prisma.child.create({
      data: {
        name,
        gender,
        age,
        checkIn,
        checkOut,
        parentId,
        facePhotos: {
          create: facePhotos.map((photo) => ({
            photo: photo,
          })),
        },
      },
    });
    return NextResponse.json(newChild, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
