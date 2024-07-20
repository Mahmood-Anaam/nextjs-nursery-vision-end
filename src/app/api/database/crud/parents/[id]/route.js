import { NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 *  @method  GET
 *  @route   ~/api/database/crud/parents/:id
 *  @desc    Get all parents along with their children and face photos
 *  @access  public
 */
export async function GET(request, { params }) {
  try {
    const parents = await prisma.parent.findMany({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json(parents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *  @method  PUT
 *  @route   ~/api/database/crud/parents/:id
 *  @desc    Update a parent
 *  @access  public
 */
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { email, name, phone, gender, address } = body;

    const updatedParent = await prisma.parent.update({
      where: { id: parseInt(params.id) },
      data: {
        email,
        name,
        phone,
        gender,
        address,
      },
    });
    return NextResponse.json(updatedParent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *  @method  DELETE
 *  @route   ~/api/database/crud/parents/:id
 *  @desc    Delete a parent and all their associated children and face photos
 *  @access  public
 */
export async function DELETE(request, { params }) {
  try {
    const parent = await prisma.parent.findUnique({
      where: { id: parseInt(params.id) },
      include: { children: true },
    });
    const childrenIds = parent.children.map((child) => child.id);
    await prisma.child.deleteMany({
      where: {
        id: { in: childrenIds },
      },
    });

    await prisma.parent.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: "parent deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
