//
//  MainViewController.h
//  SAIL
//
//  Created by IVAN WANG (EUCD-EUC-ISD-OOCLL/ZHA) on 3/8/16.
//  Copyright © 2016 IVAN WANG (EUCD-EUC-ISD-OOCLL/ZHA). All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WebViewJavascriptBridge.h"
#import "DownloadHelper.h"

@interface MainViewController : UIViewController

@property (weak, nonatomic) IBOutlet UIWebView *mainWebView;
@property (strong, nonatomic) WebViewJavascriptBridge *bridge;

@end
