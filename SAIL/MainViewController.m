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

@property (nonatomic, strong) NSString *lblMessage;
@property (nonatomic, strong) NSString *lblFileName;
@property (nonatomic, strong) NSString *progressStr;

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
        if (![DownloadHelper shareInstance].operation) {
            [self downloadFileWithName:[data objectForKey:@"downloadAppName"]];
        }
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

- (void)downloadFileWithName:(NSString *)fileName {
    
    NSString *savedPath = [NSHomeDirectory() stringByAppendingString:[NSString stringWithFormat:@"/Documents/%@.ipa",fileName]];
    [[DownloadHelper shareInstance] downloadFileWithOption:nil
                   withInferface:[NSString stringWithFormat:@"https://oceanstore.oocl.com/oceanstore/app/%@.ipa",fileName]
                       savedPath:savedPath
                 downloadSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
                     
                 } downloadFailure:^(AFHTTPRequestOperation *operation, NSError *error) {
                     
                 } progress:^(float progress) {
                     _progressStr = [NSString stringWithFormat:@"%.1f",progress * 100];
                     [_bridge callHandler:@"download_jsFunction" data:@{@"progressData" : _progressStr} responseCallback:^(id responseData) {
                     }];
                 }];
}

@end
