export class ReplyTweetTable {

    subTweetId : number|null;
    tweetId : number|null;
    userId : string;
    replyCreated : Date;
    replytweet : string;

    constructor(subTweetId:number|null, tweetId:number|null, userId:string, replyCreated:Date, replytweet:string){
        this.subTweetId = subTweetId;
        this.tweetId = tweetId;
        this.userId = userId;
        this.replyCreated = replyCreated;
        this.replytweet = replytweet;
    }

}
