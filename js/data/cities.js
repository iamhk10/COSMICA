/* Cosmica — bundled places, so a location can be chosen with no internet.
   [name, region/country, latitude, longitude, IANA time zone]  (east/north positive) */
(function (root) {
  var K = 'Asia/Kolkata';
  var IN = [
    ['Delhi', 'India', 28.61, 77.21], ['Mumbai', 'Maharashtra', 19.08, 72.88], ['Kolkata', 'West Bengal', 22.57, 88.36], ['Chennai', 'Tamil Nadu', 13.08, 80.27],
    ['Bengaluru', 'Karnataka', 12.97, 77.59], ['Hyderabad', 'Telangana', 17.39, 78.49], ['Ahmedabad', 'Gujarat', 23.02, 72.57], ['Pune', 'Maharashtra', 18.52, 73.86],
    ['Jaipur', 'Rajasthan', 26.91, 75.79], ['Lucknow', 'Uttar Pradesh', 26.85, 80.95], ['Kanpur', 'Uttar Pradesh', 26.45, 80.35], ['Nagpur', 'Maharashtra', 21.15, 79.09],
    ['Indore', 'Madhya Pradesh', 22.72, 75.86], ['Bhopal', 'Madhya Pradesh', 23.26, 77.41], ['Patna', 'Bihar', 25.59, 85.14], ['Vadodara', 'Gujarat', 22.31, 73.18],
    ['Surat', 'Gujarat', 21.17, 72.83], ['Visakhapatnam', 'Andhra Pradesh', 17.69, 83.22], ['Coimbatore', 'Tamil Nadu', 11.02, 76.96], ['Kochi', 'Kerala', 9.93, 76.27],
    ['Thiruvananthapuram', 'Kerala', 8.52, 76.94], ['Madurai', 'Tamil Nadu', 9.93, 78.12], ['Mysuru', 'Karnataka', 12.30, 76.64], ['Mangaluru', 'Karnataka', 12.91, 74.86],
    ['Chandigarh', 'Chandigarh', 30.73, 76.78], ['Amritsar', 'Punjab', 31.63, 74.87], ['Ludhiana', 'Punjab', 30.90, 75.86], ['Dehradun', 'Uttarakhand', 30.32, 78.03],
    ['Shimla', 'Himachal Pradesh', 31.10, 77.17], ['Srinagar', 'Jammu & Kashmir', 34.08, 74.80], ['Jammu', 'Jammu & Kashmir', 32.73, 74.87], ['Leh', 'Ladakh', 34.15, 77.58],
    ['Hanle', 'Ladakh (dark-sky site)', 32.78, 78.96], ['Ranchi', 'Jharkhand', 23.34, 85.31], ['Jamshedpur', 'Jharkhand', 22.80, 86.20], ['Dhanbad', 'Jharkhand', 23.80, 86.43],
    ['Bokaro', 'Jharkhand', 23.67, 86.15], ['Bhubaneswar', 'Odisha', 20.30, 85.82], ['Cuttack', 'Odisha', 20.46, 85.88], ['Raipur', 'Chhattisgarh', 21.25, 81.63],
    ['Guwahati', 'Assam', 26.14, 91.74], ['Imphal', 'Manipur', 24.82, 93.94], ['Shillong', 'Meghalaya', 25.57, 91.88], ['Aizawl', 'Mizoram', 23.73, 92.72],
    ['Kohima', 'Nagaland', 25.67, 94.11], ['Itanagar', 'Arunachal Pradesh', 27.08, 93.62], ['Agartala', 'Tripura', 23.83, 91.28], ['Gangtok', 'Sikkim', 27.33, 88.61],
    ['Panaji', 'Goa', 15.50, 73.83], ['Puducherry', 'Puducherry', 11.93, 79.83], ['Varanasi', 'Uttar Pradesh', 25.32, 83.01], ['Prayagraj', 'Uttar Pradesh', 25.44, 81.85],
    ['Agra', 'Uttar Pradesh', 27.18, 78.02], ['Meerut', 'Uttar Pradesh', 28.98, 77.71], ['Gorakhpur', 'Uttar Pradesh', 26.76, 83.37], ['Noida', 'Uttar Pradesh', 28.54, 77.39],
    ['Ghaziabad', 'Uttar Pradesh', 28.67, 77.45], ['Gurugram', 'Haryana', 28.46, 77.03], ['Faridabad', 'Haryana', 28.41, 77.31], ['Jodhpur', 'Rajasthan', 26.24, 73.02],
    ['Udaipur', 'Rajasthan', 24.59, 73.71], ['Kota', 'Rajasthan', 25.18, 75.84], ['Bikaner', 'Rajasthan', 28.02, 73.31], ['Ajmer', 'Rajasthan', 26.45, 74.64],
    ['Gwalior', 'Madhya Pradesh', 26.22, 78.18], ['Jabalpur', 'Madhya Pradesh', 23.18, 79.95], ['Nashik', 'Maharashtra', 20.00, 73.79], ['Aurangabad', 'Maharashtra', 19.88, 75.34],
    ['Solapur', 'Maharashtra', 17.66, 75.91], ['Rajkot', 'Gujarat', 22.30, 70.80], ['Vijayawada', 'Andhra Pradesh', 16.51, 80.65], ['Guntur', 'Andhra Pradesh', 16.31, 80.44],
    ['Tirupati', 'Andhra Pradesh', 13.63, 79.42], ['Warangal', 'Telangana', 17.97, 79.60], ['Hubballi', 'Karnataka', 15.36, 75.12], ['Belagavi', 'Karnataka', 15.85, 74.50],
    ['Salem', 'Tamil Nadu', 11.66, 78.15], ['Tiruchirappalli', 'Tamil Nadu', 10.79, 78.69], ['Thanjavur', 'Tamil Nadu', 10.79, 79.14], ['Kanyakumari', 'Tamil Nadu', 8.09, 77.54],
    ['Kozhikode', 'Kerala', 11.26, 75.78], ['Thrissur', 'Kerala', 10.53, 76.21], ['Port Blair', 'Andaman & Nicobar', 11.62, 92.73], ['Gaya', 'Bihar', 24.80, 85.00],
    ['Muzaffarpur', 'Bihar', 26.12, 85.39], ['Darbhanga', 'Bihar', 26.15, 85.90], ['Bhagalpur', 'Bihar', 25.24, 86.97], ['Purnia', 'Bihar', 25.78, 87.47],
    ['Katihar', 'Bihar', 25.54, 87.57], ['Siliguri', 'West Bengal', 26.73, 88.40], ['Howrah', 'West Bengal', 22.59, 88.31], ['Durgapur', 'West Bengal', 23.55, 87.32],
    ['Asansol', 'West Bengal', 23.68, 86.98], ['Haridwar', 'Uttarakhand', 29.95, 78.16], ['Rishikesh', 'Uttarakhand', 30.09, 78.27], ['Nainital', 'Uttarakhand', 29.39, 79.46]
  ].map(function (c) { return [c[0], c[1], c[2], c[3], K]; });

  var W = [
    ['London', 'United Kingdom', 51.51, -0.13, 'Europe/London'], ['Paris', 'France', 48.86, 2.35, 'Europe/Paris'], ['Berlin', 'Germany', 52.52, 13.40, 'Europe/Berlin'],
    ['Rome', 'Italy', 41.90, 12.50, 'Europe/Rome'], ['Madrid', 'Spain', 40.42, -3.70, 'Europe/Madrid'], ['Moscow', 'Russia', 55.76, 37.62, 'Europe/Moscow'],
    ['Istanbul', 'Turkey', 41.01, 28.98, 'Europe/Istanbul'], ['Reykjavik', 'Iceland', 64.15, -21.94, 'Atlantic/Reykjavik'], ['Tromsø', 'Norway', 69.65, 18.96, 'Europe/Oslo'],
    ['Cairo', 'Egypt', 30.04, 31.24, 'Africa/Cairo'], ['Nairobi', 'Kenya', -1.29, 36.82, 'Africa/Nairobi'], ['Lagos', 'Nigeria', 6.52, 3.38, 'Africa/Lagos'],
    ['Johannesburg', 'South Africa', -26.20, 28.05, 'Africa/Johannesburg'], ['Dubai', 'UAE', 25.20, 55.27, 'Asia/Dubai'], ['Riyadh', 'Saudi Arabia', 24.71, 46.68, 'Asia/Riyadh'],
    ['Tehran', 'Iran', 35.69, 51.39, 'Asia/Tehran'], ['Karachi', 'Pakistan', 24.86, 67.01, 'Asia/Karachi'], ['Lahore', 'Pakistan', 31.55, 74.34, 'Asia/Karachi'],
    ['Islamabad', 'Pakistan', 33.69, 73.05, 'Asia/Karachi'], ['Kabul', 'Afghanistan', 34.53, 69.17, 'Asia/Kabul'], ['Dhaka', 'Bangladesh', 23.81, 90.41, 'Asia/Dhaka'],
    ['Kathmandu', 'Nepal', 27.72, 85.32, 'Asia/Kathmandu'], ['Colombo', 'Sri Lanka', 6.93, 79.86, 'Asia/Colombo'], ['Thimphu', 'Bhutan', 27.47, 89.64, 'Asia/Thimphu'],
    ['Malé', 'Maldives', 4.18, 73.51, 'Indian/Maldives'], ['Bangkok', 'Thailand', 13.76, 100.50, 'Asia/Bangkok'], ['Singapore', 'Singapore', 1.35, 103.82, 'Asia/Singapore'],
    ['Kuala Lumpur', 'Malaysia', 3.14, 101.69, 'Asia/Kuala_Lumpur'], ['Jakarta', 'Indonesia', -6.21, 106.85, 'Asia/Jakarta'], ['Manila', 'Philippines', 14.60, 120.98, 'Asia/Manila'],
    ['Hong Kong', 'China', 22.32, 114.17, 'Asia/Hong_Kong'], ['Beijing', 'China', 39.90, 116.41, 'Asia/Shanghai'], ['Shanghai', 'China', 31.23, 121.47, 'Asia/Shanghai'],
    ['Tokyo', 'Japan', 35.68, 139.69, 'Asia/Tokyo'], ['Seoul', 'South Korea', 37.57, 126.98, 'Asia/Seoul'], ['Sydney', 'Australia', -33.87, 151.21, 'Australia/Sydney'],
    ['Melbourne', 'Australia', -37.81, 144.96, 'Australia/Melbourne'], ['Auckland', 'New Zealand', -36.85, 174.76, 'Pacific/Auckland'], ['New York', 'USA', 40.71, -74.01, 'America/New_York'],
    ['Washington DC', 'USA', 38.91, -77.04, 'America/New_York'], ['Chicago', 'USA', 41.88, -87.63, 'America/Chicago'], ['Houston', 'USA', 29.76, -95.37, 'America/Chicago'],
    ['Denver', 'USA', 39.74, -104.99, 'America/Denver'], ['Los Angeles', 'USA', 34.05, -118.24, 'America/Los_Angeles'], ['San Francisco', 'USA', 37.77, -122.42, 'America/Los_Angeles'],
    ['Honolulu', 'USA', 21.31, -157.86, 'Pacific/Honolulu'], ['Anchorage', 'USA', 61.22, -149.90, 'America/Anchorage'], ['Toronto', 'Canada', 43.65, -79.38, 'America/Toronto'],
    ['Vancouver', 'Canada', 49.28, -123.12, 'America/Vancouver'], ['Mexico City', 'Mexico', 19.43, -99.13, 'America/Mexico_City'], ['São Paulo', 'Brazil', -23.55, -46.63, 'America/Sao_Paulo'],
    ['Buenos Aires', 'Argentina', -34.60, -58.38, 'America/Argentina/Buenos_Aires'], ['Lima', 'Peru', -12.05, -77.04, 'America/Lima'], ['Santiago', 'Chile', -33.45, -70.67, 'America/Santiago']
  ];

  var X = root.Cosmica = root.Cosmica || {};
  X.cities = IN.concat(W).map(function (c) { return { name: c[0], region: c[1], lat: c[2], lon: c[3], tz: c[4] }; });
})(typeof window !== 'undefined' ? window : globalThis);
