-- Run this in Supabase SQL Editor to replace old products with HoneyBaby products.

alter table products add column if not exists image text;
alter table products add column if not exists category text;
alter table products add column if not exists old_price numeric;
alter table products add column if not exists badge text;
alter table products add column if not exists rating numeric;
alter table products add column if not exists reviews int;

-- Remove current products
delete from products;

insert into products (name, price, description, image, category, old_price, badge, rating, reviews) values
('Snuggle Bear Plush', 2499, 'Soft and cuddly plush bear for little ones.', 'https://images.pexels.com/photos/37158/pexels-photo-37158.jpeg?auto=compress&cs=tinysrgb&w=600', 'toys', 3200, 'sale', 4.9, 238),
('Organic Cotton Onesie Set', 1899, 'Breathable organic cotton onesie set.', 'https://images.pexels.com/photos/29015875/pexels-photo-29015875.jpeg?auto=compress&cs=tinysrgb&w=600', 'clothing', null, 'new', 4.8, 145),
('Gentle Baby Wash', 899, 'Mild baby wash for sensitive skin.', 'https://images.pexels.com/photos/5797999/pexels-photo-5797999.jpeg?auto=compress&cs=tinysrgb&w=600', 'skincare', null, null, 4.7, 89),
('Feeding Bottle Set (3pc)', 1499, 'Three-piece feeding bottle set.', 'https://images.pexels.com/photos/41222/pexels-photo-41222.jpeg?auto=compress&cs=tinysrgb&w=600', 'feeding', 1800, 'sale', 4.8, 312),
('Cloud Swaddle Blanket', 1299, 'Soft cloud-light swaddle blanket.', 'https://images.pexels.com/photos/11517553/pexels-photo-11517553.jpeg?auto=compress&cs=tinysrgb&w=600', 'sleep', null, 'new', 4.9, 178),
('Musical Mobile', 3499, 'Soothing musical crib mobile.', 'https://images.pexels.com/photos/26219889/pexels-photo-26219889.jpeg?auto=compress&cs=tinysrgb&w=600', 'toys', 4200, 'sale', 4.6, 67),
('Silicone Bib Set', 699, 'Easy-clean silicone bib set.', 'https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=600', 'feeding', null, null, 4.7, 204),
('Baby Sunscreen SPF 50', 1199, 'Gentle SPF 50 sunscreen for babies.', 'https://images.pexels.com/photos/27393233/pexels-photo-27393233.jpeg?auto=compress&cs=tinysrgb&w=600', 'skincare', null, 'new', 4.8, 53),
('Knit Romper', 1599, 'Cozy knit romper for everyday wear.', 'https://images.pexels.com/photos/28259749/pexels-photo-28259749.jpeg?auto=compress&cs=tinysrgb&w=600', 'clothing', 2000, 'sale', 4.5, 91),
('Crib Mattress Protector', 2199, 'Waterproof crib mattress protector.', 'https://images.pexels.com/photos/4964372/pexels-photo-4964372.jpeg?auto=compress&cs=tinysrgb&w=600', 'sleep', null, null, 4.7, 136),
('Stacking Rings Toy', 999, 'Classic stacking rings learning toy.', 'https://images.pexels.com/photos/35579565/pexels-photo-35579565.jpeg?auto=compress&cs=tinysrgb&w=600', 'toys', null, null, 4.6, 320),
('Hooded Towel & Mitt Set', 1799, 'Soft hooded towel and mitt set.', 'https://images.pexels.com/photos/19314798/pexels-photo-19314798.jpeg?auto=compress&cs=tinysrgb&w=600', 'skincare', 2200, 'sale', 4.9, 287);
