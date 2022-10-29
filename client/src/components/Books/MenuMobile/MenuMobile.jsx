import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import FilterCategories from "../FilterCategories/FilterCategories.jsx";
import FilterAuthor from "../FilterAuthor/FilterAuthor.jsx";
import FilterEditorial from "../FilterEditorial/FilterEditorial.jsx";
import FilterLanguage from "../FilterLanguage/FilterLanguage.jsx";
import FilterFormat from "../FilterFormat/FilterFormat.jsx";
import FilterStock from "../FilterStock/FilterStock.jsx";


const drawerWidth = 336;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export default function PersistentDrawerLeft({theme, category, subcategory, categories, history, dispatch, setStoreFilters,
    booksFilter, handleClick, storeFilters, handleDel}) {

    const themeX = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return(
        <Box sx={{ display: 'block' }}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
          <MenuIcon /> <span style={{fontSize: "18px"}}>Filters</span>
        </IconButton>
        
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {themeX.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
            <List>
            <FilterCategories
                theme={theme}
                category={category}
                subcategory={subcategory}
                categories={categories}
                history={history}
                dispatch={dispatch}
                setStoreFilters={setStoreFilters}
            />
            </List>

            <List>
                <FilterAuthor
                booksFilter={booksFilter}
                handleClick={handleClick}
                storeFilters={storeFilters}
                handleDel={handleDel}
                />
            </List>

            <List>
                <FilterEditorial
                booksFilter={booksFilter}
                handleClick={handleClick}
                storeFilters={storeFilters}
                handleDel={handleDel}
                />
            </List>

            <List>
                <FilterLanguage
                booksFilter={booksFilter}
                handleClick={handleClick}
                storeFilters={storeFilters}
                handleDel={handleDel}
                />
            </List>

            <List>
                <FilterFormat
                booksFilter={booksFilter}
                handleClick={handleClick}
                storeFilters={storeFilters}
                handleDel={handleDel}
                />
            </List>

            <List>
                <FilterStock
                handleClick={handleClick}
                storeFilters={storeFilters}
                handleDel={handleDel}
                />
            </List>
        <Divider />

        </Drawer>
      </Box>
    )
}