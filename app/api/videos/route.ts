import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideos } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const videos = await Video.find({}).sort({createdAt: -1}).lean();
        if( !videos || videos.length === 0 ){
            return NextResponse.json([], {status : 200})
        }
        return NextResponse.json(videos)

    } catch {
        return NextResponse.json(
            {error: "Filed To fetch videos"},
            {status: 200}
        )
    }
}

export async function POST(request : NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json(
                {error : "Unauthorized Session"},
                {status : 401}
            )
        }
        await connectToDatabase();
        const body:IVideos = await request.json();
        if(
            !body.title ||
            !body.description ||
            !body.videoURL ||
            !body.thumbnailUrl
        ){
            return NextResponse.json(
                {error : "Missing Required Field"},
                {status : 401}
            )
        }

        const videoData = {
            ...body,
            controls : body.controls ?? true,
            transformation: { 
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        }

        const newVideo = await Video.create(videoData);
        return NextResponse.json(newVideo)
    } catch {
        return NextResponse.json(
            {error: "Filed To Create Videos"},
            {status: 200}
        )
    }
}