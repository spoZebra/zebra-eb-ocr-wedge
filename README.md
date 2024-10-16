# Zebra Enterprise Browser - OCR Wedge
Sample project that demonstrates how a web app can leverage Zebra Devices' OCR features offered by DataWedge.
This integration is made possible by [Zebra Enterprise Browser](https://techdocs.zebra.com/enterprise-browser/), an industrial browser that can interact with device OS and HW as a native app.

OCR Wedge uses machine learning to enable fine-tuned, use-case-specific models to extract data in real-time via the Zebra Android device camera and completely offline. Supported configurations:
- License Plates
- Identification Documents
- Vehicle Identification Number (VIN)
- Tire Identification Number (TIN)
- Shipping Container ID
- Meter Reading

Full documentation: https://techdocs.zebra.com/datawedge/latest/guide/input/workflow/#ocrwedge

## Demo
https://github.com/user-attachments/assets/25f8c126-8819-40aa-b7cf-f8e1dada7c93

## Requirements
- Zebra Device with camera (running A13 or later)
- Enterprise Browser - You can download it from Google PlayStore or [here](https://www.zebra.com/gb/en/support-downloads/software/mobile-computer-software/enterprise-browser.html)
- Mobility DNA OCR Evaluation License (or purchased one) - Please contact your Zebra Sales Rep to get it.

## Setup
- Launch Enterprise Browser
- Copy all the files in this project inside one of these folders:
  - */sdcard/android/data/com.zebra.mdna.enterprisebrowser/*
  - */enterprise/device/enterprisebrowser/*
- Close and launch again the Enterprise Browser
- Enjoy 🦓

## Background
OCR functionalities rely on DataWedge which can be controlled programmatically via Intents.
Leveraging on Enterprise Browser you can send and receive intents from a web app.

### Enterprise Browser integration w/ DataWedge
This project includes a pre-configured DataWedge config file that has one profile per each OCR feature.
The web app switches profiles when needed by triggering an intent and get captured data through a broadcast receiver.
Each profile sends acquired data to the web app using intents with different action names in order to identify the data types.
You can find Enterprise Browser basic setup info [here](https://techdocs.zebra.com/enterprise-browser/3-3/guide/datawedge/).

### If you wanna know more...

- Register DataWedge Intents in Enterprise Browser (one intent per each profile so that we can distinguish this):
  https://github.com/spoZebra/zebra-eb-ocr-wedge/blob/b4ba031daca680cc8bf98b3ec39e0fa19280661e/Config.xml#L148-L158
- Download DataWedge profile:
  https://github.com/spoZebra/zebra-eb-ocr-wedge/blob/b4ba031daca680cc8bf98b3ec39e0fa19280661e/ocr-wedge-interface.js#L13-L38
- Register broadcast receiver:
  https://github.com/spoZebra/zebra-eb-ocr-wedge/blob/b4ba031daca680cc8bf98b3ec39e0fa19280661e/ocr-wedge-interface.js#L115-L118
- Switch between profiles:
  https://github.com/spoZebra/zebra-eb-ocr-wedge/blob/b4ba031daca680cc8bf98b3ec39e0fa19280661e/ocr-wedge-interface.js#L120-L137
- Parse captured data:
  https://github.com/spoZebra/zebra-eb-ocr-wedge/blob/b4ba031daca680cc8bf98b3ec39e0fa19280661e/ocr-wedge-interface.js#L73-L113



