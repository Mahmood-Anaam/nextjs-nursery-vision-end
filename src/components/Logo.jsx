import Link from "next/link";
import Image from "next/image";
import Typography from "@mui/material/Typography";

const Logo = ({ src, width = 30, height = 30, title = "Logo" }) => {
  return (
    <>
      <Link href="/" sx={{ display: "block", marginRight: "20px" }}>
        <Image src={src} alt="logo" height={height} width={width} priority />
      </Link>
      <Typography variant="h5" sx={{ marginLeft: "10px", flexGrow: 1 }}>
        {title}
      </Typography>
    </>
  );
};

export default Logo;
