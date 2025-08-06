# Working With Data

This document describes the format that data is saved in, depending on where you are viewing it.

## From SD cards

Data is stored in JSONL format, where each line contains (in order) the time (wrapped in parentheses and with values separated by commas), a colon and a space, and then the inline JSON of data where strings are wrapped in single quotes ('), like:

```
(Year, Month, Day, Days Since Monday, Hour, Minute, Second, Daylight Savings Boolean): {'TEMPERATURE': 'VALUE_1,VALUE_2,VALUE_3,VALUE_4', 'BATTERY_VOLTAGE': VALUE, '_ITERATIONS': RECORD COUNT SINCE LAST RESTART, 'TURBIDITY': VALUE, 'TDS': VALUE, 'PH': VALUE}
```

Or, from the wake Pico:

```
(Year, Month, Day, Days Since Monday, Hour, Minute, Second, Daylight Savings Boolean): {'HYDROPHONE': VALUE, 'WATER_LEVEL': VALUE, 'ABSOLUTE_ORIENTATION': 'VALUE_YAW,VALUE_PITCH,VALUE_ROLL,VALUE_ACCEL_X,VALUE_ACCEL_Y,VALUE_ACCEL_Z,VALUE_GYRO_X,VALUE_GYRO_Y,VALUE_GYRO_Z,VALUE_QUAT_X,VALUE_QUAT_Y,VALUE_QUAT_Z,VALUE_QUAT_W,VALUE_LINACCEL_X,VALUE_LINACCEL_Y,VALUE_LINACCEL_Z'}
```

A value of integer `-1` indicates an intentionally null value from a sensor. A value of integer `-5` indicates an unexpected error from a sensor that prevented its reading at this point in time.

## From Bluetooth

All data except date/time is constantly sent as comma-separated values over BLE as long as a device is connected.

For the main Pico, the order is:
* Probe ID (always `MAIN`)
* Iterations (number of records since startup)
* Datetime (year/month/day/days since Monday/hour/minute/second/DST flag, forward-slash separated)
* Battery percentage level
* Temperature (four readings, semicolon-separated)
* pH
* TDS (Total Dissolved Solids value)
* Turbidity
* Refresh countdown (seconds until next sensor reading)

For the wake Pico, the order is:
* Probe ID (always `WAKE`)
* Iterations (number of records since startup)
* Datetime (year/month/day/days since Monday/hour/minute/second/DST flag, forward-slash separated)
* Hydrophone (capped at 3)
* Water level
* Orientation (yaw;pitch;roll in radians, semicolon-separated)
* Rotation delta (sum of absolute changes in yaw/pitch/roll since last reading, capped at 40)

Note that the main Pico sends data over Bluetooth every second when a device is connected, even though it gets new values at a slower rate. The wake Pico sends data over Bluetooth as soon as it is captured (and not any more frequently).

## From PostgreSQL

If you're self-hosting and using the [data server](https://github.com/GLAS-Education/water-quality/tree/2025/data_server), the configured PostgreSQL database will contain data under the following schema:

```sql
CREATE TABLE IF NOT EXISTS main_data (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    temperature_1 REAL,
    temperature_2 REAL,
    temperature_3 REAL,
    temperature_4 REAL,
    ph REAL,
    battery_level REAL,
    tds REAL,
    turbidity REAL
);

CREATE TABLE IF NOT EXISTS wake_data (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    yaw REAL,
    pitch REAL,
    roll REAL,
    ax REAL,
    ay REAL,
    az REAL,
    gx REAL,
    gy REAL,
    gz REAL,
    qx REAL,
    qy REAL,
    qz REAL,
    qw REAL,
    lax REAL,
    lay REAL,
    laz REAL,
    hydrophone_reading REAL,
    water_level REAL
);
```

We recommend one of the following tools for easy querying and visualization of this data:

* [Heroku Dataclips](https://devcenter.heroku.com/articles/dataclips) lets you save SQL queries for Heroku Postgres databases and view the results as tables or graphs. Dataclips can be shared via links; the associated query can be ran and explored by anyone who has the link.
* [Grafana](https://grafana.com) will let you build your own dashboard UIs to share or collaborate on that use any PostgreSQL database as their source.
* [pgAdmin 4](https://www.pgadmin.org/) lets you connect to any PostgreSQL database, run one-off queries, and visualize them as tables or graphs very similarly to Heroku Dataclips.

## Units

| Value | Absolute? | Notes/Units |
|-------|-----------|-------|
| Battery level | ✅ Standardized | Percentage remaining |
| Temperature | ✅ Standardized | Degrees Celsius |
| pH | ✅ Standardized | Value on the pH scale (0-14) |
| TDS | ✅ Standardized | ppm (parts per million) |
| Turbidity | ✅ Standardized | NTU (Nephelometric Turbidity Units) |
| Hydrophone | ❌ Relative | We called 3 our threshold for "loud enough to likely be a motorboat passing by" |