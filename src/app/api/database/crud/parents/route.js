import { NextResponse } from 'next/server';
import prisma from "@/utils/db";

/**
 *  @method  GET
 *  @route   ~/api/database/crud/parents
 *  @desc    Get all parents along with their children and face photos
 *  @access  public
 */
export async function GET(request) {
    try {
        const parents = await prisma.parent.findMany();
        return NextResponse.json(parents, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }
}

/**
 *  @method  POST
 *  @route   ~/api/database/crud/parents
 *  @desc    Create a new parent 
 *  @access  public
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { email, name, phone, gender, address} = body;
        const newParent = await prisma.parent.create({
            data: {
                email,
                name,
                phone,
                gender,
                address,
            }
        });
        return NextResponse.json(newParent, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }
}
