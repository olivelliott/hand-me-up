import React from 'react';
import ImageUploading from 'react-images-uploading';

import {
  Box,
  Flex,
  Spacer,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Input,
  Button,
  ButtonGroup,
  Container
} from '@chakra-ui/react'

export function PhotoDrop() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 10;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Container>
      <FormControl mb={5} >
        <FormLabel>Item Name</FormLabel>
        <Input type='text' name='item-name'/>
        <FormLabel>Item Description</FormLabel>
        <Textarea placeholder='Please describe the condition of the item in as much detail as possible.' name='item-description' />
      </FormControl>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Button
              mb={5}
              colorScheme='teal'
              variant='outline'
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click to Upload a Photo
            </Button>
            &nbsp;
            <Button 
              mb={5}
              colorScheme='red'
              onClick={onImageRemoveAll}>Remove all images
            </Button>
            {imageList.map((image, index) => (
              <Grid
                maxW='sm'
                key={index}
                className="image-item">
                <GridItem w='100%'>
                  <img src={image['data_url']} alt="" width="100" />
                </GridItem>
                <div className="image-item__btn-wrapper">
                  <Button
                    size='xs'
                    colorScheme='teal'
                    onClick={() => onImageUpdate(index)}
                    >Change</Button>
                  <Button 
                    size='xs'
                    colorScheme='red'
                    onClick={() => onImageRemove(index)}
                    >Remove</Button>
                </div>
              </Grid>
            ))}
          </div>
        )}
      </ImageUploading>
    </Container>
  );
}