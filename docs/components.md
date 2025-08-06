# Component List

## Core

These devices are required for the device to do any sort of data collection/storing.

* [Raspberry Pi Pico 2W](https://www.adafruit.com/product/6087) (**2x**)
  * This microcontroller board features the RP2040 dual-core processor and built-in WiFi/Bluetooth connectivity.
  * It serves as the main processing unit for data collection, sensor management, and wireless communication.
* [DS1307 Real Time Clock](https://www.adafruit.com/product/3296)
  * This device runs off an independent battery and keeps track of real world time.
  * It is read by each Pico to ensure correct timestamping of datapoints.
* [SPI MicroSD Reader](https://www.adafruit.com/product/4682) (**2x**)
  * Each Pico reads and writes to its own MicroSD card through its own MicroSD reader, because two devices cannot interface with the same reader simultaneously.
  * A small SD card (4–8 GB) may be used. This is sufficient because the data is stored in raw text (.txt) format. 
    * For reference, 6 days of data under the wake Pico (which records more frqeuently than the main Pico) took up 111 MB of storage.
  * The SD card may not exceed 32 GB. If it does, partition it to be under 32 GB, or else the Pico may be unable to handle reading/writing to it.
* Status LEDs (**2x**, any standard LED works)
  * Used to indicate bootup success or failure(s) in a glance.
  * Solid light on power = success; flashing light = one or more failures.

## Sensors

These sensors are used to learn about water quality or other environmental details.

* [DS18B20 Temperature Sensor](https://www.adafruit.com/product/381) (**4x**)
  * One for each measuring location:
    * One is inside the housing with the main electronics
    * One is just above the water, attached to the platform
    * One sits just below the water, on the pole 
    * One sits at the bottom of the pole, roughly three feet down
* [MAX9814 Microphone](https://www.adafruit.com/product/1713)
  * To be submerged in non-conductive mineral oil
  * Sound level is interpreted from raw analog values by calculating the range in a sample of sound data captured over 50ms
* [BNO085 9-DOF Orientation Sensor](https://www.adafruit.com/product/4754)
  * Used to detect and measure boat waves
* Atlas Scientific pH Sensor ([Carrier Board](https://www.amazon.com/Atlas-Scientific-Electrically-Isolated-Carrier/dp/B084T5ZZGQ), [Probe](https://www.amazon.com/Atlas-Scientific-Consumer-Grade-Probe/dp/B07VDMNB92), [Sensor](https://www.amazon.com/Atlas-Scientific-Gravity-Analog-Sensor/dp/B07SNGVH5T))
  * pH must be [calibrated](/docs/sensors/ph#calibration) before deployment
* [SEN0244 Gravity Analog TDS Sensor](https://wiki.dfrobot.com/Gravity__Analog_TDS_Sensor___Meter_For_Arduino_SKU__SEN0244)
  * Used to monitor the amount of conductive particles in the water
  * Deployed 3 feet underwater

## Meta Sensors

These sensors collect data that is related to the device, not the water quality itself.

* [Digital Output Water Detection Sensor](https://www.adafruit.com/product/4965)
  * Detects if there is water has gotten into the sensor housing.
  * Interpreted through ADC values:
    * Below 1,000 is dry
    * Between 1,000 and 10,000 is damp (~1–2 drops of water on sensor)
    * Above 10,000 is wet
* [Battery Level Sensor](https://www.adafruit.com/product/5580)
  * Used to monitor the battery's percent charge.
