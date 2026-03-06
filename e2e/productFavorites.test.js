describe('Product Favorites Flow', () => {
  beforeEach(async () => {
    await device.launchApp({delete: true, newInstance: true});
  });

  it('should display the product catalog on launch', async () => {
    await waitFor(element(by.id('product-list')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.text('Product Catalog'))).toBeVisible();
  });

  it('should open a product, add to favorites, and verify state persists', async () => {
    await waitFor(element(by.id('product-list')))
      .toBeVisible()
      .withTimeout(10000);

    await waitFor(element(by.id('product-card-1')))
      .toBeVisible()
      .withTimeout(5000);

    // Tap on the product title/content area to navigate (avoid the favorite overlay)
    await element(by.id('product-card-1')).tap({x: 5, y: 5});

    // Wait for a concrete element on the details screen (the details favorite button)
    await waitFor(element(by.id('favorite-btn-details')))
      .toBeVisible()
      .withTimeout(10000);

    // Verify the "Description" section rendered (unique to the details screen)
    await expect(element(by.text('Description'))).toBeVisible();

    // The favorite button should show the unfilled heart initially
    await expect(element(by.label('Add to favorites'))).toBeVisible();

    // Tap to add to favorites
    await element(by.id('favorite-btn-details')).tap();

    // Verify the label switched to "Remove from favorites" (filled heart)
    await waitFor(element(by.label('Remove from favorites')))
      .toBeVisible()
      .withTimeout(3000);

    // Navigate back to the main screen
    await element(by.id('back-button')).tap();

    await waitFor(element(by.id('product-list')))
      .toBeVisible()
      .withTimeout(5000);

    // The card's favorite button should still be visible (state persisted)
    await expect(element(by.id('favorite-btn-card-1'))).toBeVisible();
  });

  it('should toggle favorite off from the product card', async () => {
    await waitFor(element(by.id('product-list')))
      .toBeVisible()
      .withTimeout(10000);

    await waitFor(element(by.id('favorite-btn-card-1')))
      .toBeVisible()
      .withTimeout(5000);

    // Favorite a product directly from the card
    await element(by.id('favorite-btn-card-1')).tap();

    // Open product details to verify state propagated
    await element(by.id('product-card-1')).tap({x: 5, y: 5});

    await waitFor(element(by.id('favorite-btn-details')))
      .toBeVisible()
      .withTimeout(10000);

    // Should reflect the favorited state set from the card
    await expect(element(by.label('Remove from favorites'))).toBeVisible();

    // Toggle it off from the details screen
    await element(by.id('favorite-btn-details')).tap();

    // Verify it's back to unfavorited
    await waitFor(element(by.label('Add to favorites')))
      .toBeVisible()
      .withTimeout(3000);

    // Go back and confirm card state is consistent
    await element(by.id('back-button')).tap();

    await waitFor(element(by.id('product-list')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
