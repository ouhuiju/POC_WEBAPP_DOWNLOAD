//
//  MainViewController.m
//  SAIL
//
//  Created by IVAN WANG (EUCD-EUC-ISD-OOCLL/ZHA) on 3/8/16.
//  Copyright © 2016 IVAN WANG (EUCD-EUC-ISD-OOCLL/ZHA). All rights reserved.
//

#import "MainViewController.h"
#import <AFNetworking.h>

#define kFileURLStr @"http://files.cnblogs.com/files/huangjianwu/metro_demo"

@interface MainViewController ()

//@property (nonatomic, strong) MBProgressHUD *hud;
@property (nonatomic, strong) NSString *lblMessage;
@property (nonatomic, strong) NSString *lblFileName;
@property (nonatomic, strong) NSString *progressStr;
@property (nonatomic, strong) AFHTTPRequestOperation *operation;

@end


@implementation MainViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.

    [self initBridge];
    [self initWebView];

}

- (void)initBridge {
    // WebViewJavascriptBridge setting
    if (_bridge) {return;}

    // Instantiate WebViewJavascriptBridge
    _bridge = [WebViewJavascriptBridge bridgeForWebView:_mainWebView];

    // Register a JS Logger in ObjC
    [_bridge registerHandler:@"JSLog" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"[JSLog]: %@", data);
    }];

    // Register a handler in ObjC, can be called by JS
    [_bridge registerHandler:@"nativeFunction" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"[NativeLog]: nativeFunction had been called from JS with data: %@", data);
        responseCallback(@"response from native");

        // call a JS handler
        NSLog(@"[NativeLog]: native call jsFunction......");
        [_bridge callHandler:@"jsFunction" data:@{@"key" : @"caller", @"value" : @"native"} responseCallback:^(id responseData) {
            NSLog(@"[NativeLog]: native received response from JS with data: %@", responseData);
        }];
    }];

    // Register a handler in ObjC, can be called by JS
    [_bridge registerHandler:@"about_nativeFunction" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"[NativeLog]: about_nativeFunction had been called from JS with data: %@", data);
        responseCallback(@"response from native");

        // call a JS handler
        NSLog(@"[NativeLog]: native call about_jsFunction......");
        [_bridge callHandler:@"about_jsFunction" data:@{@"key" : @"caller", @"value" : @"native"} responseCallback:^(id responseData) {
            NSLog(@"[NativeLog]: native received response from JS with data: %@", responseData);
        }];
    }];
    
    _progressStr = @"0";
    // Register a handler in ObjC, can be called by JS
    [_bridge registerHandler:@"download_nativeFunction" handler:^(id data, WVJBResponseCallback responseCallback) {
        if (!_operation) {
            [self downloadFile];
        }
        responseCallback(_progressStr);
        // call a JS handler
        [_bridge callHandler:@"download_jsFunction" data:@{@"key" : @"caller", @"value" : @"native", @"progressData" : _progressStr} responseCallback:^(id responseData) {
        }];
    }];
}

- (void)initWebView {
    // webView setting
    _mainWebView.scrollView.scrollEnabled = NO;

    NSString *htmlPath = [[NSBundle mainBundle] pathForResource:@"mainMenu" ofType:@"html" inDirectory:@"www/html/modules"];
    NSString *appHtml = [NSString stringWithContentsOfFile:htmlPath encoding:NSUTF8StringEncoding error:nil];
    NSURL *baseURL = [NSURL fileURLWithPath:htmlPath];
    [_mainWebView loadHTMLString:appHtml baseURL:baseURL];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)downloadFile{
    NSString *savedPath = [NSHomeDirectory() stringByAppendingString:@"/Documents/sail.ipa"];
    [self downloadFileWithOption:nil
                   withInferface:@"https://oceanstore.oocl.com/oceanstore/app/sail.ipa"
                       savedPath:savedPath
                 downloadSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
                     
                 } downloadFailure:^(AFHTTPRequestOperation *operation, NSError *error) {
                     
                 } progress:^(float progress) {

                 }];
}

/**
 *  @author Jakey
 *
 *  @brief  下载文件
 *
 *  @param paramDic   附加post参数
 *  @param requestURL 请求地址
 *  @param savedPath  保存 在磁盘的位置
 *  @param success    下载成功回调
 *  @param failure    下载失败回调
 *  @param progress   实时下载进度回调
 */
- (void)downloadFileWithOption:(NSDictionary *)paramDic
                 withInferface:(NSString*)requestURL
                     savedPath:(NSString*)savedPath
               downloadSuccess:(void (^)(AFHTTPRequestOperation *operation, id responseObject))success
               downloadFailure:(void (^)(AFHTTPRequestOperation *operation, NSError *error))failure
                      progress:(void (^)(float progress))progress
{
    
    //沙盒路径    //NSString *savedPath = [NSHomeDirectory() stringByAppendingString:@"/Documents/xxx.zip"];
    AFHTTPRequestSerializer *serializer = [AFHTTPRequestSerializer serializer];
    NSMutableURLRequest *request =[serializer requestWithMethod:@"POST" URLString:requestURL parameters:paramDic error:nil];
    _operation = [[AFHTTPRequestOperation alloc]initWithRequest:request];
    [_operation setOutputStream:[NSOutputStream outputStreamToFileAtPath:savedPath append:NO]];
    [_operation setDownloadProgressBlock:^(NSUInteger bytesRead, long long totalBytesRead, long long totalBytesExpectedToRead) {
        float p = (float)totalBytesRead / totalBytesExpectedToRead;
        progress(p);
//        NSLog(@"download：%f", p);
        _progressStr = [NSString stringWithFormat:@"%.0f",p * 100];
    }];
    [_operation setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
        success(operation,responseObject);
        NSLog(@"下载成功");
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        success(operation,error);
        NSLog(@"下载失败");
        
    }];
    [_operation start];
}

@end
