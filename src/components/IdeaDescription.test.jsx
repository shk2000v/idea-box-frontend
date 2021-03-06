import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import IdeaDescription from './IdeaDescription';

import IDEA from '../__fixtures__/idea';

jest.mock('../assets');

describe('IdeaDescription', () => {
  const handleClickThink = jest.fn();
  const handleClickLike = jest.fn();

  function renderIdeaDescription() {
    render(<IdeaDescription
      idea={IDEA}
      liked={given.liked}
      loading={given.loading}
      onClickThink={handleClickThink}
      onClickLike={handleClickLike}
    />);
  }

  beforeEach(() => {
    handleClickThink.mockClear();
    handleClickLike.mockClear();
  });

  it('renders idea', () => {
    renderIdeaDescription();

    expect(screen.getByText(/프로그래머/)).toBeInTheDocument();
    expect(screen.getByText(/맛있는 라면/)).toBeInTheDocument();
  });

  describe('likes idea', () => {
    context('when not liked', () => {
      given('liked', () => false);

      it('can like idea', () => {
        renderIdeaDescription();

        fireEvent.click(screen.getByRole('button', { name: '좋아요' }));

        expect(handleClickLike).toBeCalled();
      });
    });

    context('when liked', () => {
      given('liked', () => true);

      it('disabled like button', () => {
        renderIdeaDescription();

        expect(screen.getByRole('button', { name: '좋아요' })).toBeDisabled();
      });
    });
  });

  describe('loading', () => {
    context('when loading', () => {
      given('loading', () => true);

      it('disabled think button', () => {
        renderIdeaDescription();

        expect(screen.getByRole('button', { name: '아이디어 있어?' })).toBeDisabled();
      });
    });

    context('when not loading', () => {
      given('loading', () => false);

      it('refreshes idea', () => {
        renderIdeaDescription();

        fireEvent.click(screen.getByRole('button', { name: '아이디어 있어?' }));

        expect(handleClickThink).toBeCalled();
      });
    });
  });
});
