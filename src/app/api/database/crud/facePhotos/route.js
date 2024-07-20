import { NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 *  @method  GET
 *  @route   ~/api/database/crud/facePhotos
 *  @desc    Get all face photos
 *  @access  public
 */
export async function GET(request) {
  try {
    console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
    const facePhotos = await prisma.facePhoto.findMany();
    return NextResponse.json(facePhotos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *  @method  POST
 *  @route   ~/api/database/crud/facePhotos
 *  @desc    Create a new face photo
 *  @access  public
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { photo, childId } = body;
    const newFacePhoto = await prisma.facePhoto.create({
      data: {
        photo,
        childId,
      },
    });
    return NextResponse.json(newFacePhoto, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
