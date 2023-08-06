export {};

declare global {
  interface Window {
    dataLayer: any;
  }
}

export const gtm = (eventName: string, eventProperties: object, extra?: object) =>
{

  if (window["dataLayer"])
  {
  console.log("Hello");

    window["dataLayer"] = window["dataLayer"] || [];
    window["dataLayer"].push(
      {
        'event' : eventName,
        'event_properties' : eventProperties,
        ...extra
      });
  }
}
