import mongoose, {Schema, model, models} from "mongoose";

export const VIDEO_DIMENSION = {
    width: 1000,
    height : 1920
}

export interface IVideos {
    _id? : mongoose.Types.ObjectId,
    title : string;
    description : string,
    videoURL : string,
    thumbnailUrl : string,
    controls? : boolean,
    transformation? : {
        height : number,
        width : number,
        quality? : number 
    }
    createdAt : Date,
    updatedAt : Date 
}

const videoSchema = new Schema<IVideos>(
    {
        title : {type : String, required : true},
        description : {type : String, required : true},
        videoURL : {type : String, required : true},
        thumbnailUrl : {type : String, required : true},
        controls : {type : Boolean, default : true},
        transformation : {
            height : {type : Number, default : VIDEO_DIMENSION.height},
            width : {type : Number, default : VIDEO_DIMENSION.width},
            quality : {type : Number, min : 1, max : 100}
        }
    },
    {timestamps : true}
)

const Video = models?.Video || model<IVideos>("Video", videoSchema);
export default Video