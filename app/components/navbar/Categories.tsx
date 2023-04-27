"use client";

import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { BsSnow } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md"
import { IoDiamond } from "react-icons/io5";
import { TbMountain, TbPool } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    cnLabel: "海滩",
    Icon: TbBeach,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Windmills",
    cnLabel: "风车小屋",
    Icon: GiWindmill,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Modern",
    cnLabel: "现代",
    Icon: MdOutlineVilla,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Countryside",
    cnLabel: "乡村民宿",
    Icon: TbMountain,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Pools",
    cnLabel: "魅力泳池",
    Icon: TbPool,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Islands",
    cnLabel: "岛屿",
    Icon: GiIsland,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Lake",
    cnLabel: "临湖",
    Icon: GiBoatFishing,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Skiing",
    cnLabel: "雪场民宿",
    Icon: FaSkiing,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Castles",
    cnLabel: "庄园豪宅",
    Icon: GiCastle,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Camping",
    cnLabel: "野营",
    Icon: GiForestCamp,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Arctic",
    cnLabel: "Arctic",
    Icon: BsSnow,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Cave",
    cnLabel: "洞穴",
    Icon: GiCaveEntrance,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Desert",
    cnLabel: "沙漠",
    Icon: GiCactus,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Barns",
    cnLabel: "房车",
    Icon: GiBarn,
    description: "Tshi property is close to the beach!",
  },
  {
    label: "Luxe",
    cnLabel: "Luxe",
    Icon: IoDiamond,
    description: "Tshi property is close to the beach!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            selected={category === item.label}
            {...item}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
