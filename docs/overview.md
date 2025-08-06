# Project Overview

The GLAS Water Quality Sensor is an independent device that floats on bodies of water, attaches to some permanent structure like a buoy, and collects and reports a wide variety of data about water quality and activity.

:::info
This documentation captures the Water Quality project as a work in progress. While the project continues to grow and change, we've documented our journey extensively to help you build upon what we've learned. Your contributions matter—whether you discover new insights or create additional features, we encourage you to share them through our [code repository](https://github.com/glas-education/water-quality) or by updating this documentation (see "Edit this Page" below).
:::

## Data Types Collected

* Temperature (at four depths)
* pH
* TDS
* Underwater sound level
* Rotational change due to waves
* Turbidity (in testing)
* Wind speed (in testing)
* Internal water level
* Device battery life

## Architecture

Within the sensor, two [Raspberry Pi Pico 2W](https://www.raspberrypi.com/products/raspberry-pi-pico-2/)s handle data collection—each on their own frequency. One Pico serves as the "main Pico," responsible for recording metrics that do not change often. Its measurement frequency is variable, calculated based on remaining battery life. The other Pico serves as the "wake Pico," responsible for recording metrics that update very quickly: most notably, absolute rotation and acceleration of device.

Both Picos emit a BLE wireless signal, which you can connect to from most modern devices, including mobile phones. This allows for live monitoring of each device's status and recently collected data when nearby.

## Documentation Meta

If you're new to this project and want to gain a comprehensive understanding, we recommend reading this documentation site in the order that pages are listed in the sidebar (top to bottom) when fully expanded.