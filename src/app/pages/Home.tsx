import {
  Database,
  Target,
  Upload,
  ArrowRight,
  Briefcase,
  FileSearch,
  Activity,
  Award,
  ChevronRight,
  Plus
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import Workspace from "./Workspace";
import About from "./About";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isLoggedIn") === "true";
    }
    return false;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  if (!isLoggedIn) {
    return <About />;
  }

  return <Workspace />;
}
