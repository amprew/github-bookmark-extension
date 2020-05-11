import store from 'store2';
import { v4 as uuidv4 } from 'uuid';

export const addBookmark = (bookmark) => {
  const bookmarks = store.get('bookmarks') || [];

  const bookmarkWithId = Object.assign({}, bookmark, { id: uuidv4() });

  bookmarks.push(bookmarkWithId);
  store.set('bookmarks', bookmarks);

  return bookmarkWithId;
};

export const removeBookmark = (id) => {
  const bookmarks = store
    .get('bookmarks')
    .filter(b => b.id !== id);

  store.set('bookmarks', bookmarks);
  return bookmarks;
};

export const updateBookmark = (id, updatedFeilds) => {
  const bookmarks = store
    .get('bookmarks')
    .map(b => {
      if (b.id === id) {
        return Object.assign({}, b, updatedFeilds);
      }

      return b;
    });

  store.set('bookmarks', bookmarks);

  return bookmarks;
};

export const findBookmark = (id) => {
  return store.get('bookmarks')?.find(b => b.id === id);
}

export const getAllBookmarks = () => (
  store.get('bookmarks') || []
);
