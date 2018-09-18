---
lang: en
layout: article_with_sidebar
updated_at: '2018-09-14 13:10 +0400'
identifier: ref_4bXaF5qJ
title: Color Swatches
order: 61
published: true
---
The [Color Swatches module](https://market.x-cart.com/addons/color-swatches.html#product-details-tab-description "Color Swatches") helps to visualize different colors and fabrics having them displayed as clickable swatches on the product page. 

<div class="ui stackable two column grid">
  <div class="column" markdown="span"><i>W/o color swatches</i>![cus-without-color-swatches.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/cus-without-color-swatches.png)</div>
  <div class="column" markdown="span"><i>With color swatches</i>![cus-color-swatches.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/cus-color-swatches.png)</div>
</div>

{% toc %}

## Instaling and Configuring Color Swatches

To install the module follow the guides from {% link "Installing addons from the Marketplace" ref_Vn1mMUw9 %}.

When installed proceed to the module settings page to configure it:

![installed.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/installed.png)

The Color Swatches module settings are rather straightforward: 

![settings.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/settings.png)

Here you can define the sizes (hight and width) of a swatch image in the customer storefront and whether to use the color swatch name as an attribute option name or not.

Don't forget to **submit** the new configuration settings to make them active.

The module adds a special **Color swatches** section (**Catalog** -> **Color swatches**) to the store admin area where a store admin can configure the swatches themselves:

![swatches-list.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/swatches-list.png)

Initially the swatches list is empty and the store admin should create all swatches from scratch. 

To create a swatch:
1. Click **Create**. You'll see a new blank line with the fields to be defined.
2. Add a swatch name in the line
   ![create-swatch.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/create-swatch.png)
3. Choose the swatch color:
   ![add-color.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/add-color.png)
   * Click in the **Color** field for the color panel to be displayed
   * Choose the color you need
   * Click a multicolor round botton in the bottom right corner to add the chosen color
   * The color code and the color itself will be added to the swatch
4. Click **Save changes**

If necessary you can add an image to the color swatch. 

For this purpose:
1. Click **+** in the image field of a swatch
   ![add-image.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/add-image.png)
2. Upload an image either from computer or via URL
3. **Save changes**

## Adding Color Swatches to Product-Specific Attributes

When all required color swatches are created you can add them to product descriptions. For this purpose find a product you need to modify in the product list (**Catalog** -> **Products**), proceed to the product details page and open the **Attributes** tab:

![attributes-add-swatches.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/attributes-add-swatches.png)

{% note info %}
In case there are no product attributes for a product you'll need to {% link "create" ref_kEKoAxJB %} them first.
{% endnote %}

Check in the **Color swatches** check-box, add color swatches to the product attributes from the drop-down and **save** the changes. 

![attributes-save-swatches.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/attributes-save-swatches.png)

That's it, the color swatches option is added for a product and will be displayed in the storefront instead of the default layout:

![cus-color-swatches.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/cus-color-swatches.png)

## Adding Color Swatches for Product Variants

If the **Use color swatch name as an attribute option name** option is enabled product variants (if any) will be renamed to swatches automatically when the color swatches are added to the product attributes:

<div class="ui stackable two column grid">
  <div class="column" markdown="span"><i>Before color swatches</i>![variants-before-swatches.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/variants-before-swatches.png)</div>
  <div class="column" markdown="span"><i>After color swatches</i>![variants-after-swarches.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/variants-after-swarches.png)</div>
</div>

If you add images to the product variants the product image displayed to a customer will change depending on the chosen lolor swatch:

<div class="ui stackable four column grid">
  <div class="column" markdown="span"><i>Variants with imagess</i>![variants-with-swatches.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/variants-with-swatches.png)</div>
  <div class="column" markdown="span"><i>Color 1</i>![cus-var-1.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/cus-var-1.png)</div>
  <div class="column" markdown="span"><i>Color 2</i>![cus-var-2.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/cus-var-2.png)</div>
  <div class="column" markdown="span"><i>Color 3</i>![cus-var-3.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/cus-var-3.png)</div>
</div>

If no images are added to the product variants the product image will stay the same regardless of the product color chosen.

## Adding Color Swatches to Global Attributes

If you want to apply color swatches to all products in your store and you have {% link "global attributes set-up" ref_HzMkgc0q %} for them you can add color swatches to global attributes and they will be applied to all products with global attributes automatically. 

To add color swatches to global atributes:
1. Locate the attribute you need to add a color swatch to (**Catalog** -> **Classes & attributes**) and click **Edit** or [create a new global attribute](https://kb.x-cart.com/product_classes_and_attributes/managing_global_attributes.html#adding-global-attributes "Color Swatches") 
2. Toggle on the **Use color swatches** option in the pop-up
   <div class="ui stackable two column grid">
    <div class="column" markdown="span">![global-new.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/global-new.png)</div>
    <div class="column" markdown="span">![global-edit.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/global-edit.png)</div>
   </div>
3. Specify the values choosing the appropriate color swatch from a drop-down
   ![global-add-swatch.png]({{site.baseurl}}/attachments/ref_4bXaF5qJ/global-add-swatch.png)
4. Save the changes
5. [Assign global apptibutes to products](https://kb.x-cart.com/product_classes_and_attributes/managing_global_attributes.html#assigning-global-attributes-to-products "Color Swatches")