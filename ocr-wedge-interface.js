CURRENT_PROFILE = "DEFAULT"

window.onload = function() {
    startIntentListener()
    captureBarcode()
};

function captureLP(){
    switchToProfile("lp")
    CURRENT_PROFILE = "lp"
}
function captureVIN(){
    switchToProfile("vin")
    CURRENT_PROFILE = "lp"
}
function captureTIN(){
    switchToProfile("tin")
    CURRENT_PROFILE = "lp"
}
function captureBarcode(){
    switchToProfile("barcode")
    CURRENT_PROFILE = "DEFAULT"
}

function dwBroadcastReceiver(myIntentData) 
{
    console.log(myIntentData)
    // if (myIntentData != null && myIntentData.action == "com.symbol.datawedge.api.NOTIFICATION_ACTION") {

    //     let b = myIntentData["com.symbol.datawedge.api.NOTIFICATION"];
    //     let NOTIFICATION_TYPE = b["NOTIFICATION_TYPE"];
    
    //     if (NOTIFICATION_TYPE !== null) {
    //         switch (NOTIFICATION_TYPE) {
    //             case NOTIFICATION_TYPE_SCANNER_STATUS:
    //                 console.log("SCANNER_STATUS: status: " + b["STATUS"] + ", profileName: " + b["PROFILE_NAME"]);
    //                 break;
    
    //             case NOTIFICATION_TYPE_PROFILE_SWITCH:
    //                 console.log("PROFILE_SWITCH: profileName: " + b["PROFILE_NAME"] + ", profileEnabled: " + b["PROFILE_ENABLED"]);
    //                 CURRENT_PROFILE = b["PROFILE_NAME"]
    //                 startCapture();
    //                 break;
    
    //             case NOTIFICATION_TYPE_CONFIGURATION_UPDATE:
    //                 // Handle CONFIGURATION_UPDATE if needed
    //                 break;
    
    //             case NOTIFICATION_TYPE_WORKFLOW_STATUS:
    //                 console.log("WORKFLOW_STATUS: status: " + b["STATUS"] + ", profileName: " + b["PROFILE_NAME"]);
    //                 break;
    //         }
    //     }
    // }
    // else
    if (myIntentData != null && myIntentData.action == "com.symbol.dw.action") 
	{
        // Assuming 'intent' contains the data as a string, similar to getStringExtra in Java
        let data = myIntentData.data;

        if (CURRENT_PROFILE == "lp") {
            var ouptutDiv = document.getElementById("lp_output");
            ouptutDiv.innerHTML = data["com.symbol.datawedge.data_string"];

            console.log("License Plate: " + data["com.symbol.datawedge.data_string"]);	
        } else if (CURRENT_PROFILE == "vin") {
            var ouptutDiv = document.getElementById("vin_output");
            ouptutDiv.innerHTML = data["com.symbol.datawedge.data_string"];

            console.log("VIN (Vehicle Identification Number): " + data["com.symbol.datawedge.data_string"]);
        } else if (CURRENT_PROFILE == "tin") {
            var ouptutDiv = document.getElementById("tin_output");
            ouptutDiv.innerHTML = data["com.symbol.datawedge.data_string"];
            console.log("TIN (Tyre Identification Number): " + data["com.symbol.datawedge.data_string"]);
        } else {
            // DEFAULT
            var ouptutDiv = document.getElementById("scanner_output");
            ouptutDiv.innerHTML = data["com.symbol.datawedge.data_string"];
            console.log("Scanned Data: " + data["com.symbol.datawedge.data_string"]);
        }

    }
	else {
        console.log("Intent action is not registered...");
    }
}

function startIntentListener(){
    EB.Intent.startListening(dwBroadcastReceiver);
    // Register for notification
	// var extras = {
    //     "com.symbol.datawedge.api.REGISTER_FOR_NOTIFICATION": {
    //         "com.symbol.datawedge.api.APPLICATION_NAME": "com.zebra.mdna.enterprisebrowser",
    //         "com.symbol.datawedge.api.NOTIFICATION_TYPE": "PROFILE_SWITCH"
    //     }
    // };
	// sendIntentData(extras);	

	console.log("startListening");
}

function startCapture(){
    var params = {
        intentType: EB.Intent.BROADCAST,
        action: 'com.symbol.datawedge.api.ACTION_SOFTSCANTRIGGER',
        appName: 'com.symbol.datawedge',
        data: {"com.symbol.datawedge.api.EXTRA_PARAMETER":"START_SCANNING"}
    };
    EB.Intent.send(params);	
}

function switchToProfile(profileName){
	var extras = {
		"com.symbol.datawedge.api.SWITCH_TO_PROFILE":profileName,
	};
	sendIntentData(extras);	

    const toastLive = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive)
    toastBootstrap.show()
    setTimeout(function(){
        startCapture()
   },1000);  
}

function sendIntentData(extraData)
{
	var params = {
		intentType: EB.Intent.BROADCAST,
		action: 'com.symbol.datawedge.api.ACTION',
		appName: 'com.symbol.datawedge',
		data: extraData
	};
	EB.Intent.send(params);	
}
