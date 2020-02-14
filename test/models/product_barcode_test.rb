require "test_helper"

class ProductBarcodeTest < ActiveSupport::TestCase
  def create_product_barcode(body:, barcoder: user, product: the_product)
    Products::Services::CreateProductBarcode.new.(
      user_id: barcoder.id,
      product_id: the_product.id,
      body: body,
    )
  end

  def delete_product_barcode(id:)
    Products::Services::DestroyProductBarcode.new.(
      id: id
    )
  end

  def lab_barcoder
    @lab_barcoder ||= lab_user
  end

  def the_product
    @the_product ||= create(:product)
  end

  test "it has a valid factory" do # do we need this?
    barcode = build(:product_barcode)
    assert barcode.valid?
  end

  test "A user can create and delete a product_barcode" do
    result = create_product_barcode(body: "hello there", barcoder: lab_barcoder, product: the_product).success
    assert_equal 1, the_product.product_barcodes.count

    service = delete_product_barcode(id: result.id)
    assert service.success?
    assert_equal 0, the_product.product_barcodes.count
  end

  test "it is dependent on the product" do
    result = create_product_barcode(body: "hello there", barcoder: lab_barcoder, product: the_product).success
    barcode = the_product.product_barcodes.first
    the_product.destroy

    assert_raises(ActiveRecord::RecordNotFound) do
      barcode.reload
    end
  end

end
