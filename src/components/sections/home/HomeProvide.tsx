import Subtitle from "@/components/ui/Subtitle";
import Text from "@/components/ui/Text";
import { icons } from "@/constants/icons";
import Image from "next/image";

interface IMovie_genres {
  id: number;
  title: string;
  description: string;
  icon: any;
}

export default function HomeProvide() {
  const MovieTypes: IMovie_genres[] = [
    {
      id: 1,
      title: "Smartphones",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: icons.Smartphones,
    },
    {
      id: 2,
      title: "Tablet",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: icons.Tablet,
    },
    {
      id: 3,
      title: "Smart TV",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: icons.SmartTV,
    },
    {
      id: 4,
      title: "Laptops",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: icons.Laptops,
    },
    {
      id: 5,
      title: "Gaming Consoles",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: icons.GamingConsoles,
    },
    {
      id: 6,
      title: "VR Headsets ",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: icons.VRHeadsets,
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="mb-37.5">
          <div className="mb-20 max-[640px]:mb-10">
            <Subtitle text="We Provide you streaming experience across various devices." />
            <Text text="With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment." />
          </div>
          <ul className="grid grid-cols-3 gap-7.5 max-[1150px]:grid-cols-2 max-[768px]:grid-cols-1">
            {MovieTypes.map((el, index) => (
              <li
                key={index}
                className="max-[640px]:p-6 bg-[linear-gradient(220deg,_rgba(229,0,0,0.05)_0%,_rgba(15,15,15,1)_20%)] border border-[#333333] rounded-lg p-12.5"
              >
                <div className="">
                  <div className="flex items-center gap-4 mb-7.5">
                    <div className="max-[640px]:w-11 max-[640px]:h-11 w-18 h-18 flex items-center justify-center rounded-lg bg-[#141414]">
                      <Image
                        src={el.icon}
                        alt={el.title}
                        className="max-[640px]:w-6 max-[640px]:h-6"
                      />
                    </div>
                    <h3 className="text-[18px] text-white ">{el.title}</h3>
                  </div>
                  <div className="">
                    <p className="text-[18px] max-[640px]:text-[14px] text-[#999999]">
                      {el.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
