//
//  DownloadHelper.m
//  SAIL
//
//  Created by OKAR OU on 16/3/29.
//  Copyright © 2016年 IVAN WANG (EUCD-EUC-ISD-OOCLL/ZHA). All rights reserved.
//

#import "DownloadHelper.h"

@implementation DownloadHelper

static DownloadHelper *sharedInstance = nil;

+ (DownloadHelper *)shareInstance {
    if (sharedInstance == nil)
        sharedInstance = [[super alloc] init];
    
    return sharedInstance;
}

- (void)downloadFileWithOption:(NSDictionary *)paramDic
                 withInferface:(NSString*)requestURL
                     savedPath:(NSString*)savedPath
               downloadSuccess:(void (^)(AFHTTPRequestOperation *operation, id responseObject))success
               downloadFailure:(void (^)(AFHTTPRequestOperation *operation, NSError *error))failure
                      progress:(void (^)(float progress))progress
{
    //sanbox link
    //NSString *savedPath = [NSHomeDirectory() stringByAppendingString:@"/Documents/xxx.zip"];
    AFHTTPRequestSerializer *serializer = [AFHTTPRequestSerializer serializer];
    NSMutableURLRequest *request =[serializer requestWithMethod:@"POST" URLString:requestURL parameters:paramDic error:nil];
    _operation = [[AFHTTPRequestOperation alloc]initWithRequest:request];
    [_operation setOutputStream:[NSOutputStream outputStreamToFileAtPath:savedPath append:NO]];
    [_operation setDownloadProgressBlock:^(NSUInteger bytesRead, long long totalBytesRead, long long totalBytesExpectedToRead) {
        float p = (float)totalBytesRead / totalBytesExpectedToRead;
        progress(p);
        //        NSLog(@"download：%f", p);
    }];
    [_operation setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
        success(operation,responseObject);
        NSLog(@"download success");
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        success(operation,error);
        NSLog(@"download fail");
        
    }];
    [_operation start];
}

@end
