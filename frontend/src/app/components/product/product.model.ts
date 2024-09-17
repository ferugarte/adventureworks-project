export interface Product {
  ProductID: number;  // Unique identifier for the product.
  Name: string;  // The name of the product.
  ProductNumber: string;  // A unique product number used to identify the product.
  MakeFlag: boolean;  // Indicates if the product is manufactured internally (true) or purchased (false).
  FinishedGoodsFlag: boolean;  // Specifies if the product is a finished good (true) or not (false).
  Color?: string;  // The color of the product (optional, can be null).
  SafetyStockLevel: number;  // Minimum stock level before reorder is required.
  ReorderPoint: number;  // The stock quantity that triggers a reorder.
  StandardCost: number;  // The standard cost to produce or purchase the product.
  ListPrice: number;  // The price at which the product is sold.
  Size?: string;  // The size of the product (optional, can be null).
  SizeUnitMeasureCode?: string;  // Unit of measure for size (optional, can be null).
  WeightUnitMeasureCode?: string;  // Unit of measure for weight (optional, can be null).
  Weight?: number;  // Weight of the product (optional, can be null).
  DaysToManufacture: number;  // The number of days required to manufacture the product.
  ProductLine?: string;  // The product line (optional, can be null).
  Class?: string;  // The classification of the product (optional, can be null).
  Style?: string;  // The style of the product (optional, can be null).
  ProductSubcategoryID?: number;  // ID for the product subcategory (optional, can be null).
  ProductModelID?: number;  // ID for the product model (optional, can be null).
  SellStartDate: Date;  // The date when the product was first available for sale.
  SellEndDate?: Date;  // The date when the product was discontinued (optional, can be null).
  DiscontinuedDate?: Date;  // The date when the product was no longer available (optional, can be null).
}
