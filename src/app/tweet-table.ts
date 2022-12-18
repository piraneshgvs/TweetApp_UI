export class TweetTable {

    tweetId : number | null;
    userId : string;
    rootTweet : string;
    date : Date;
    likeCount : number | null;
    likeUser  : string;

    constructor(tweetId:number | null,userId:string,rootTweet:string,date:Date,likeCount:number | null,likeUser:string){
        this.tweetId = tweetId;
        this.userId = userId;
        this.rootTweet = rootTweet;
        this.date = date;
        this.likeCount = likeCount;
        this.likeUser = likeUser;
    }


}
