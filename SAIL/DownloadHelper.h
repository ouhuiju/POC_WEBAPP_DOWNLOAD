//
//  DownloadHelper.h
//  SAIL
//
//  Created by OKAR OU on 16/3/29.
//  Copyright © 2016年 IVAN WANG (EUCD-EUC-ISD-OOCLL/ZHA). All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AFNetworking/AFNetworking.h>

@interface DownloadHelper : NSObject

@property (nonatomic, strong) AFHTTPRequestOperation *operation;

+ (DownloadHelper *)shareInstance;

/**
 *  @brief  download file
 *
 *  @param paramDic   post param
 *  @param requestURL url location
 *  @param savedPath  local location
 *  @param success    download success callback
 *  @param failure    download fail callback
 *  @param progress   progress callback
 */
- (void)downloadFileWithOption:(NSDictionary *)paramDic
                 withInferface:(NSString*)requestURL
                     savedPath:(NSString*)savedPath
               downloadSuccess:(void (^)(AFHTTPRequestOperation *operation, id responseObject))success
               downloadFailure:(void (^)(AFHTTPRequestOperation *operation, NSError *error))failure
                      progress:(void (^)(float progress))progress;

@end
