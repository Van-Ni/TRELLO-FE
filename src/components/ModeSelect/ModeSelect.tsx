import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useColorScheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
type Mode = 'light' | 'dark' | 'system';
export const ModeSelect = () => {
    const { mode, setMode } = useColorScheme();
    const handleChange = (event: SelectChangeEvent) => {
        const selectedMode = event.target.value as Mode;
        setMode(selectedMode);
    };
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            {/* <InputLabel id="demo-select-small-label">Mode</InputLabel> */}
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={mode}
                label="Mode"
                onChange={handleChange}
            >
                <MenuItem value={'light'}>
                    {/*#Trello2: https://smartdevpreneur.com/when-to-use-the-mui-sx-prop-styled-api-or-theme-override/
             Dùng div hay Box của mui
            - div : <style>
            - Box : <sx> có thể tùy chỉnh kích thước nhanh khi có yêu cầu ( theme.tsx ) 
            */}
                    <Box component="section" sx={{ display: "flex", gap: 1 }}>
                        <LightModeIcon fontSize="small" /> Light
                    </Box>
                </MenuItem>
                <MenuItem value={'dark'}>
                    <Box component="section" sx={{ display: "flex", gap: 1 }}>
                        <DarkModeIcon fontSize="small" /> Dark
                    </Box>
                </MenuItem>
                <MenuItem value={'system'}>
                    <Box component="section" sx={{ display: "flex", gap: 1 }}>
                        <SettingsBrightnessIcon fontSize="small" /> System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
}
