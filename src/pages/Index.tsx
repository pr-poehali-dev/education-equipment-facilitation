import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryCity, setDeliveryCity] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  const products: Product[] = [
    {
      id: 1,
      name: 'Интерактивная доска Smart Board',
      category: 'Оборудование',
      price: 145000,
      image: '/placeholder.svg',
      description: 'Современная интерактивная доска с сенсорным управлением'
    },
    {
      id: 2,
      name: 'Парты ученические регулируемые',
      category: 'Мебель',
      price: 8500,
      image: '/placeholder.svg',
      description: 'Эргономичные парты с регулировкой высоты'
    },
    {
      id: 3,
      name: 'Телевизор Samsung 65"',
      category: 'Техника',
      price: 85000,
      image: '/placeholder.svg',
      description: 'Профессиональный телевизор для учебных классов'
    },
    {
      id: 4,
      name: 'Информационный стенд настенный',
      category: 'Стенды',
      price: 12000,
      image: '/placeholder.svg',
      description: 'Магнитно-маркерный стенд формата А1'
    },
    {
      id: 5,
      name: 'Стулья для аудиторий (компл. 30 шт)',
      category: 'Мебель',
      price: 45000,
      image: '/placeholder.svg',
      description: 'Прочные стулья с анатомической спинкой'
    },
    {
      id: 6,
      name: 'Проектор Epson EB-2250U',
      category: 'Оборудование',
      price: 125000,
      image: '/placeholder.svg',
      description: 'Мультимедийный проектор высокой яркости'
    },
    {
      id: 7,
      name: 'Стенд "Уголок безопасности"',
      category: 'Стенды',
      price: 15500,
      image: '/placeholder.svg',
      description: 'Информационный стенд с карманами А4'
    },
    {
      id: 8,
      name: 'Шкафы для документов (комплект)',
      category: 'Мебель',
      price: 35000,
      image: '/placeholder.svg',
      description: 'Металлические шкафы с замками'
    }
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} добавлен в корзину`);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
    toast.info('Товар удален из корзины');
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDelivery = () => {
    const total = calculateTotal();
    if (total === 0) return 0;
    if (total > 500000) return 0;
    if (deliveryCity.toLowerCase().includes('москва')) return 5000;
    if (deliveryCity.toLowerCase().includes('санкт-петербург')) return 7000;
    return 10000;
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      toast.error('Корзина пуста');
      return;
    }
    if (!deliveryCity) {
      toast.error('Укажите город доставки');
      return;
    }
    toast.success('Заказ оформлен! Наш менеджер свяжется с вами в ближайшее время.');
    setCart([]);
    setDeliveryCity('');
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ОснащениеПро
                </h1>
                <p className="text-sm text-muted-foreground">Комплексное оснащение школ</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors font-medium">
                Главная
              </button>
              <button onClick={() => scrollToSection('catalog')} className="text-foreground hover:text-primary transition-colors font-medium">
                Каталог
              </button>
              <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors font-medium">
                Услуги
              </button>
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors font-medium">
                О компании
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-foreground hover:text-primary transition-colors font-medium">
                Контакты
              </button>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-accent">{cart.length}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="ShoppingBag" size={24} />
                    Корзина покупок
                  </SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${cart.length}`}
                  </SheetDescription>
                </SheetHeader>
                
                {cart.length > 0 && (
                  <div className="space-y-6 mt-6">
                    <div className="space-y-4">
                      {cart.map(item => (
                        <Card key={item.id} className="hover-scale">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{item.price.toLocaleString('ru-RU')} ₽</p>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto"
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                      <CardHeader>
                        <CardTitle className="text-lg">Расчет стоимости</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="city">Город доставки</Label>
                          <Input
                            id="city"
                            placeholder="Например: Москва"
                            value={deliveryCity}
                            onChange={(e) => setDeliveryCity(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="space-y-2 pt-2 border-t">
                          <div className="flex justify-between text-sm">
                            <span>Стоимость товаров:</span>
                            <span className="font-medium">{calculateTotal().toLocaleString('ru-RU')} ₽</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Доставка:</span>
                            <span className="font-medium">
                              {deliveryCity ? (
                                calculateDelivery() === 0 ? (
                                  <span className="text-green-600">Бесплатно</span>
                                ) : (
                                  `${calculateDelivery().toLocaleString('ru-RU')} ₽`
                                )
                              ) : '—'}
                            </span>
                          </div>
                          <div className="flex justify-between text-lg font-bold pt-2 border-t">
                            <span>Итого:</span>
                            <span className="text-primary">
                              {(calculateTotal() + calculateDelivery()).toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        </div>
                        <Button onClick={handleOrder} className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                        {calculateTotal() > 500000 && (
                          <p className="text-sm text-green-600 text-center">
                            🎉 Бесплатная доставка при заказе от 500 000 ₽
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="home" className="py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-sm px-4 py-2">
                🚀 Инновационные решения для образования
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Комплексное оснащение
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  учебных заведений
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Современное оборудование, качественная мебель, информационные стенды и техника для школ и университетов
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('catalog')} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Перейти в каталог
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')}>
                  <Icon name="Phone" size={20} className="mr-2" />
                  Связаться с нами
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="hover-scale bg-gradient-to-br from-primary/10 to-primary/5">
                <CardHeader>
                  <Icon name="Award" size={32} className="text-primary mb-2" />
                  <CardTitle>500+</CardTitle>
                  <CardDescription>Оснащенных учреждений</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale bg-gradient-to-br from-secondary/10 to-secondary/5 mt-8">
                <CardHeader>
                  <Icon name="Users" size={32} className="text-secondary mb-2" />
                  <CardTitle>10 лет</CardTitle>
                  <CardDescription>На рынке образования</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale bg-gradient-to-br from-accent/10 to-accent/5">
                <CardHeader>
                  <Icon name="TrendingUp" size={32} className="text-accent mb-2" />
                  <CardTitle>98%</CardTitle>
                  <CardDescription>Довольных клиентов</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale bg-gradient-to-br from-primary/10 to-secondary/10 mt-8">
                <CardHeader>
                  <Icon name="Package" size={32} className="text-primary mb-2" />
                  <CardTitle>1000+</CardTitle>
                  <CardDescription>Товаров в каталоге</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <Badge className="mb-4 bg-secondary text-white">Каталог товаров</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Наша продукция
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Широкий ассортимент товаров для комплексного оснащения учебных заведений
            </p>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="Мебель">Мебель</TabsTrigger>
              <TabsTrigger value="Оборудование">Оборудование</TabsTrigger>
              <TabsTrigger value="Техника">Техника</TabsTrigger>
              <TabsTrigger value="Стенды">Стенды</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <Card key={product.id} className="hover-scale group overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                      />
                      <Badge className="absolute top-2 right-2 bg-white text-foreground">{product.category}</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
                      <Button onClick={() => addToCart(product)} className="bg-gradient-to-r from-primary to-secondary">
                        <Icon name="Plus" size={16} className="mr-1" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {['Мебель', 'Оборудование', 'Техника', 'Стенды'].map(category => (
              <TabsContent key={category} value={category} className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.filter(p => p.category === category).map((product) => (
                    <Card key={product.id} className="hover-scale group overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                        />
                        <Badge className="absolute top-2 right-2 bg-white text-foreground">{product.category}</Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
                        <Button onClick={() => addToCart(product)} className="bg-gradient-to-r from-primary to-secondary">
                          <Icon name="Plus" size={16} className="mr-1" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="services" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent text-white">Наши услуги</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Что мы предлагаем
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-scale">
              <CardHeader>
                <Icon name="Truck" size={48} className="text-primary mb-4" />
                <CardTitle>Доставка и монтаж</CardTitle>
                <CardDescription>
                  Бесплатная доставка при заказе от 500 000 ₽. Профессиональный монтаж и установка оборудования
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-scale">
              <CardHeader>
                <Icon name="FileText" size={48} className="text-secondary mb-4" />
                <CardTitle>Консультация и подбор</CardTitle>
                <CardDescription>
                  Наши эксперты помогут подобрать оптимальное оборудование под задачи вашего учреждения
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-scale">
              <CardHeader>
                <Icon name="Shield" size={48} className="text-accent mb-4" />
                <CardTitle>Гарантия качества</CardTitle>
                <CardDescription>
                  Официальная гарантия на все товары. Сервисное обслуживание и техническая поддержка
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary text-white">О компании</Badge>
              <h2 className="text-4xl font-bold mb-6">
                ОснащениеПро — ваш надежный партнер
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  Мы специализируемся на комплексном оснащении образовательных учреждений более 10 лет.
                  За это время мы оборудовали более 500 школ, колледжей и университетов по всей России.
                </p>
                <p className="text-lg">
                  Наша миссия — создавать современную и комфортную образовательную среду,
                  которая способствует эффективному обучению и развитию студентов.
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Icon name="CheckCircle2" size={24} />
                    <span>Сертифицированная продукция</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-semibold">
                    <Icon name="CheckCircle2" size={24} />
                    <span>Работа по 44-ФЗ и 223-ФЗ</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                  <CardHeader>
                    <Icon name="Target" size={32} className="text-primary mb-2" />
                    <CardTitle className="text-lg">Индивидуальный подход</CardTitle>
                    <CardDescription>К каждому проекту</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                  <CardHeader>
                    <Icon name="Clock" size={32} className="text-accent mb-2" />
                    <CardTitle className="text-lg">Быстрая доставка</CardTitle>
                    <CardDescription>По всей России</CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <div className="space-y-4 pt-8">
                <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
                  <CardHeader>
                    <Icon name="BadgeCheck" size={32} className="text-secondary mb-2" />
                    <CardTitle className="text-lg">Качество</CardTitle>
                    <CardDescription>Проверенных брендов</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
                  <CardHeader>
                    <Icon name="HeartHandshake" size={32} className="text-primary mb-2" />
                    <CardTitle className="text-lg">Постоянная поддержка</CardTitle>
                    <CardDescription>24/7 для клиентов</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary text-white">Свяжитесь с нами</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Остались вопросы?
              </h2>
              <p className="text-xl text-muted-foreground">
                Наши специалисты готовы помочь с выбором оборудования и оформлением заказа
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      <p className="text-muted-foreground">+7 (800) 555-35-35</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" size={24} className="text-secondary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="text-muted-foreground">info@osnashcheniepro.ru</p>
                      <p className="text-muted-foreground">sales@osnashcheniepro.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={24} className="text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Адрес</p>
                      <p className="text-muted-foreground">г. Москва, ул. Образцова, д. 15</p>
                      <p className="text-muted-foreground">Офис 301, БЦ "Инновация"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Режим работы</p>
                      <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                      <p className="text-muted-foreground">Сб-Вс: выходной</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Отправить сообщение</CardTitle>
                  <CardDescription>Мы ответим в течение 1 часа</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.'); }}>
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" placeholder="Ваше имя" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="example@mail.ru" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea id="message" placeholder="Опишите ваш запрос..." className="mt-1" rows={4} required />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary" size="lg">
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ОснащениеПро</h3>
              <p className="text-sm text-gray-400">
                Комплексное оснащение учебных заведений качественным оборудованием и мебелью
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Мебель</li>
                <li>Оборудование</li>
                <li>Техника</li>
                <li>Стенды</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>О нас</li>
                <li>Услуги</li>
                <li>Доставка</li>
                <li>Гарантия</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+7 (495) 123-45-67</li>
                <li>info@osnashcheniepro.ru</li>
                <li>г. Москва, ул. Образцова, 15</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 ОснащениеПро. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
