window.onload = function() {
    // Download datawedge db file
    downloadDatawedgeFile()

    // Register to datawedge intents
    startIntentListener()

    // Force profile switch to default one
    switchToProfile("barcode", false)
};


function downloadDatawedgeFile() {
    // Copy Datawedge config to download folder
    var destination = "/sdcard/Download/datawedge.db";
    EB.RhoFile.copy("/sdcard/android/data/com.zebra.mdna.enterprisebrowser/datawedge.db", destination)
    
    // Send to datawedge import command from download folder
    var extras = {
        "FOLDER_PATH": "/sdcard/Download/",
        "FILE_LIST": [
            "datawedge.db"
        ]
    };
	var params = {
		intentType: EB.Intent.BROADCAST,
		action: 'com.symbol.datawedge.api.ACTION',
		appName: 'com.symbol.datawedge',
		data: {
            "com.symbol.datawedge.api.IMPORT_CONFIG": extras,
            "SEND_RESULT": "true",
            "COMMAND_IDENTIFIER": "123456789"
        }
	};
	EB.Intent.send(params);	
    // hide spinner
    var divSpinner = document.getElementById("custom-overlay");
    divSpinner.hidden = true; 

    // Decomment if you want to host this app
    //  var f = EB.Network.downloadFile({
    //    url: "./datawedge.db",
    //    filename: "/enterprise/device/settings/datawedge/autoimport/datawedge.db",
    //    overwriteFile: true,
    //    createFolders: true,
    //    downloadNotification: false
    //  },downloadCallback);
}

// Decomment if you want to host this app
// function downloadCallback(dat) {
//     if(dat != null && dat.error_code == 200){
//         var divSpinner = document.getElementById("custom-overlay");
//         divSpinner.hidden = true; 
//     } else{
//         alert('Unable to configure DataWedge! Please restart the app');
//     } 
// }

function captureLP(){
    switchToProfile("lp")
}
function captureVIN(){
    switchToProfile("vin")
}
function captureTIN(){
    switchToProfile("tin")
}
function captureId(){
    switchToProfile("id")
}

function dwBroadcastReceiver(myIntentData) 
{
    console.log(myIntentData)
    if (myIntentData != null && myIntentData.action.startsWith("com.symbol.dw")) 
	{ 
        // Get value data
        let data = myIntentData.data["com.symbol.datawedge.data_string"];

        var ouptutDiv;
        switch (myIntentData.action) {
            case "com.symbol.dwid.action":
                ouptutDiv = document.getElementById("id_output");
                console.log("Identification Document: " + data);
                break;
            case "com.symbol.dwlp.action":
                ouptutDiv = document.getElementById("lp_output");
                console.log("License Plate: " + data);
                break;

            case "com.symbol.dwvin.action":
                ouptutDiv = document.getElementById("vin_output");
                console.log("VIN (Vehicle Identification Number): " + data);
                break;

            case "com.symbol.dwtin.action":
                ouptutDiv = document.getElementById("tin_output");
                console.log("TIN (Tyre Identification Number): " + data);
                break;

            default:
                console.log("AN ERROR OCCURED - WRONG PROFILE");
                break;
        }

        // Display data
        ouptutDiv.innerHTML = data;
    }
	else {
        console.log("Intent action is not registered...");
    }
}

function startIntentListener(){
    EB.Intent.startListening(dwBroadcastReceiver);
	console.log("startListening");
}

function switchToProfile(profileName, sendTrigger = true){
	var extras = {
		"com.symbol.datawedge.api.SWITCH_TO_PROFILE":profileName,
	};
	sendIntentData(extras);	

    // Trigger 
    if(sendTrigger){
        // Show trigger toast
        const toastLive = document.getElementById('liveToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive)
        toastBootstrap.show()

        setTimeout(function(){
            startCapture()
        },1000);  
    }
}

function startCapture(){
    // Trigger scanner/camera upon configuration
    var params = {
        intentType: EB.Intent.BROADCAST,
        action: 'com.symbol.datawedge.api.ACTION_SOFTSCANTRIGGER',
        appName: 'com.symbol.datawedge',
        data: {"com.symbol.datawedge.api.EXTRA_PARAMETER":"START_SCANNING"}
    };
    EB.Intent.send(params);	
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
