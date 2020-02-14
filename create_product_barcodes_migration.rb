class CreateProductBarcodes < ActiveRecord::Migration[5.2]
  def change
    create_table :product_barcodes do |t|
      t.belongs_to :product
      t.text :body
      t.timestamps
    end
  end
end
