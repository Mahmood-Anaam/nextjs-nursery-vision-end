"use client";

import {
  IconLayoutDashboard,
  IconFaceId,
  IconDatabase,
  IconMessageChatbot,
  IconMail,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const navigationData = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },

  {
    navlabel: true,
    subheader: "Vision",
  },

  {
    id: uniqueId(),
    title: "Face Detection",
    icon: IconFaceId,
    href: "/vision/face-detection",
  },

  {
    id: uniqueId(),
    title: "Chat",
    icon: IconMessageChatbot,
    href: "/vision/chat",
  },

  {
    navlabel: true,
    subheader: "Data Base",
  },
  {
    id: uniqueId(),
    title: "CRUD",
    icon: IconDatabase,
    href: "/database/crud",
  },

  {
    navlabel: true,
    subheader: "Setting",
  },
  {
    id: uniqueId(),
    title: "My Acount",
    icon: IconMail,
    href: "/setting/myacount",
  },
];

export default navigationData;
