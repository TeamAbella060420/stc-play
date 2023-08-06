

export interface AddEventProps
{
    event: string;
    event_properties: object;
    user_properties: object;
}

const useGTM = () =>
{
    const addEvent = ({ event, event_properties, user_properties }: AddEventProps) =>
    {
      if (window.dataLayer)
      {
          window.dataLayer.push({
            event,
            event_properties: { platform: 'Web', ...event_properties },
            user_properties: { ...user_properties }
          })
      }
    }

    return { addEvent }
}

export default useGTM;
