import * as React from "react";
import { Box, Slider, Typography } from "@mui/material";

function CustomSlider({ min, max, defaultValue, step, onChange = {} }) {
  defaultValue = defaultValue > max ? min : defaultValue;
  const [val, setVal] = React.useState(defaultValue);
  const handleChange = (e, newValue) => {
    setVal(newValue);
    onChange(e, newValue);
  };

  return (
    <Box>
      <Slider
        step={step}
        value={val}
        aria-labelledby="continuous-slider"
        valueLabelDisplay="auto"
        min={min}
        max={max}
        onChange={handleChange}
        fullWidth
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body2"
          onClick={() => setVal(min)}
          sx={{ cursor: "pointer" }}
        >
          {min} min
        </Typography>
        <Typography
          variant="body2"
          onClick={() => setVal(max)}
          sx={{ cursor: "pointer" }}
        >
          {max} max
        </Typography>
      </Box>
    </Box>
  );
}

export default CustomSlider;
