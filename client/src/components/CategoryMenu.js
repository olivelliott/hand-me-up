import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import React, { useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { idbPromise } from '../utils/helpers';

import { QUERY_CATEGORIES } from "../utils/queries";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../utils/actions';
import { useStoreContext } from "../utils/GlobalState";

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  
  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <>
    <Tabs variant='soft-rounded' colorScheme='green'>
    <TabList>
      {categories.map((item) => (
        <Tab
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </Tab>
      ))}
    </TabList>
    </Tabs>
    </>
  );
}

export default CategoryMenu;
