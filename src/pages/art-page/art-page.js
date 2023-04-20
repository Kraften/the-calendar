import React, { useState } from 'react';
import styled from 'styled-components';
import OptionsMenuComponent from '../../components/options-menu-component';
import TopMenuComponent from '../../components/top-menu-component/top-menu-component';
import Could from '../../resources/img/cloud.png';
import { ref } from 'firebase/storage';
import { storage } from '../../services/firebase/firebase';

const ArtPage = () => {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  // const [files, setFiles] = useState();

  // const files = ref(storage, 'gs://calendar-92ec5.appspot.com');
  const getNewImages = () => {
    
    const listRef = ref(storage, 'gs://calendar-92ec5.appspot.com');
  
    // Find all the prefixes and items.
    listRef
      .listAll()
      .then((res) => {
    
        
        res.items.forEach((itemRef) => {
          
          let urlRef = storage.refFromURL(itemRef);
          let fileName = urlRef.name;
          console.log("FILE NAME" + fileName);
        });
      })
      .catch((error) => {
        console.log("ERROR" + error);
        // Uh-oh, an error occurred!
      });
  };
  getNewImages()

  // useEffect(() => {}, []);

  // // Find all the prefixes and items.
  // listAll(files).then((res) => {
  //   res.prefixes.forEach((folderRef) => {
  //     // All the prefixes under listRef.
  //     // You may call listAll() recursively on them.
  //     const path =`${folderRef._location.bucket}/${folderRef._location.path}`
  //     // console.log('asd', `${folderRef._location.bucket}/${folderRef._location.path}`);
  //     const a = ref(storage, path);
  //     listAll(a).then(e => {
  //       console.log(e)
  //     })
  //   });

  //   // res.items.forEach((itemRef) => {
  //   //   // All the items under listRef.
  //   //   // console.log('asd', itemRef);
  //   // });
  // })
  // .catch((error) => {
  //   // Uh-oh, an error occurred!
  //   console.log(error)
  // });

  const toggleOptionsMenuChild = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };

  return (
    <div>
      <StyledArtPage>
        <TopMenuComponent
          firstRowHeaderText={'Art Page'}
          hasTwoRows={false}
          click={toggleOptionsMenuChild}
        ></TopMenuComponent>
        <OptionsMenuComponent
          isMenuOpen={isOptionsMenuOpen}
          toggleOptionsMenuChild={toggleOptionsMenuChild}
        />
        <StyledArtSection>
          <SectionHeader>Art Page</SectionHeader>
          <StyledImage src={Could} width="300px" height="200px" />
          <StyledImage2 src={Could} width="300px" height="200px" />
          <StyledImage3 src={Could} width="300px" height="200px" />
        </StyledArtSection>
        <StyledArtSection>
          <SectionHeader>Art Page</SectionHeader>
          <StyledImage src={Could} width="300px" height="200px" />
          <StyledImage2 src={Could} width="300px" height="200px" />
          <StyledImage3 src={Could} width="300px" height="200px" />
        </StyledArtSection>
        <StyledArtSection>
          <SectionHeader>Art Page</SectionHeader>
          <StyledImage src={Could} width="300px" height="200px" />
          <StyledImage2 src={Could} width="300px" height="200px" />
          <StyledImage3 src={Could} width="300px" height="200px" />
        </StyledArtSection>
      </StyledArtPage>
    </div>
  );
};

export default ArtPage;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledArtPage = styled.div`
  animation: fadeIn 500ms linear forwards;
`;
const StyledArtSection = styled.div`
  animation: fadeIn 500ms linear forwards;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr;
  width: 100%;
  align-content: center;
  justify-items: center;
  align-items: center;
  grid-gap: 1rem;
  margin-bottom: 50px;
`;

const SectionHeader = styled.div`
  grid-column: 4 / 5;
  grid-row: 3 / 5;
  justify-self: end;
  margin-bottom: 1rem;
  writing-mode: vertical-rl;
  font-size: 2em;
  font-weight: bold;
  text-decoration: underline;
`;

const StyledImage = styled.img`
  box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 50%);
  grid-column: 2 / 4;
  grid-row: 2 / 4;
  opacity: 0.85;
`;
const StyledImage2 = styled.img`
  box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 50%);
  grid-column: 2 / 6;
  grid-row: 3 / 6;
  opacity: 0.85;
`;
const StyledImage3 = styled.img`
  box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 50%);
  grid-column: 1 / 3;
  grid-row: 3 / 5;
  z-index: -1;
`;
