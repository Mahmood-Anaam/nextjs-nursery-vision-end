import { registerSchema } from "@/utils/validationSchemas";
import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";


/**
 *  @method  POST
 *  @route   ~/api/users/register
 *  @desc    Create New User [(Register) (Sign Up)]
 *  @access  private
 */

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "this user already registered" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
        isAdmin: body.isAdmin,
      },
    });

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
