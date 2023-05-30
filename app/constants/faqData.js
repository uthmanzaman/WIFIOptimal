import assets from "./assets";



const faqData = [
  {
    id: "FAQ-01",
    name: "Interferances",
    description:
      "Change the Wi-Fi channel: Wi-Fi routers operate on different channels, and neighboring networks can cause interferences, Log in to your router's configuration page and try switching to a less congested channel. Update firmware and drivers: Ensure that your router's firmware is up to date and latest Wi-Fi drivers are installed on your device newer firmware versions often include bug fixes and performance improvements.",
      image: assets.Interferance,
  },
  {
    id: "FAQ-02",
    name: "Placement",
    description:
      "Place your router centrally: The more centrally you can place it, the better your home's overall coverage will be and avoid placing near a window and other devices or appliances which cause interferences. Place it out in the open area - Always have your router visible, as placing it in an obscured area will have negative impact on your connection. Avoid corners: Avoid placing the router in corners, as the signal tends to disperse outward from the router, Placing it closer to the center allows for better coverage in all directions.",
      image: assets.placement,
  },
  {
    id: "FAQ-03",
    name: "Throughput",
    description:
    "Use 5 GHz frequency band: If your router supports dual-band WiFi, utilize the 5 GHz frequency band, It typically offers faster speeds and is less congested compared to the 2.4 GHz band. Use WiFi range extenders or mesh networks: If you have dead spots or areas with weak WiFi coverage, consider using range extenders or a mesh network system.",
    image: assets.obstacles,
    },
  {
    id: "FAQ-04",
    name: "QOS Rules",
    description:
    "Access the router's administration interface. Log in to the router. Enable QoS. Set priority or bandwidth allocation. Create QoS rules: Configure the QoS rules based on your requirements, You can set priorities, allocate bandwidth limits, or apply rate limits for specific applications, services, devices, or IP ranges  ",
    image: assets.qos,

    },
];

export { faqData };
