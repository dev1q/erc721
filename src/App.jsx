import React from 'react';
import './App.css';

import { useMemo } from 'react';
import { Helmet } from 'react-helmet';

const imageTags = ['og:image', 'twitter:image'];
const descriptionTags = [
  'description',
  'og:description',
  'twitter:description',
];

export const useChangeMetaTags = ({ title, image, description }) => {
  useMemo(() => {
    if (title) {
      const titleElt = document.head.querySelector('title');

      if (titleElt) {
        if (titleElt.text !== title) {
          titleElt.text = title;
        }
      } else {
        const newTitleElt = document.createElement('title');
        newTitleElt.text = title;
        document.head.append(newTitleElt);
      }
    }

    const changeMeta = (metaSelectors, content, tags) => {
      if (content) {
        let excludeTags = [...tags];

        metaSelectors.forEach((metaElt) => {
          if (tags.includes(metaElt.name)) {
            metaElt.content = content;

            const index = excludeTags.findIndex(
              (name) => name === metaElt.name
            );

            excludeTags.splice(index, 1);
          }
        });

        if (excludeTags.length) {
          excludeTags.forEach((name) => {
            const metaTag = document.createElement('meta');

            metaTag.name = name;
            metaTag.content = content;

            document.head.append(metaTag);
          });
        }
      }
    };

    if (image || description) {
      const metaSelectors = document.head.querySelectorAll('meta');

      changeMeta(metaSelectors, image, imageTags);
      changeMeta(metaSelectors, description, descriptionTags);
    }
  }, [title, image, description]);
};

const getChangeMetaTags = ({ title, image, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta
      name="og:image"
      content={image}
    />
    <meta
      name="twitter:image"
      content={image}
    />
    <meta
      name="description"
      content={description}
    />
    <meta
      name="og:description"
      content={description}
    />
    <meta
      name="twitter:description"
      content={description}
    />
  </Helmet>
);
const App = () => (
  <div className="App">
    Test image
    {getChangeMetaTags({
      title: 'Test title',
      description: 'This is a test title',
      image:
        'https://img.edilportale.com/product-thumbs/b_FLOORA-NESITE-489946-rel87e0a964.jpg',
    })}
  </div>
);

export default App;
