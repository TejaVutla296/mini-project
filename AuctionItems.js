import React, { useState } from 'react';
import './AuctionItems.css';
import AddItemForm from './AddItemForm';
import fridgeImage from './fridge.png';
import washMach from './washingMachine.png';
import tv from './tv.png';
import mw from './mw.png';
import ac from './ac.png';
import inn from './inn.png';
import dzire from './dzire.png';
import city from './city.png';
import re from './re.png';
import pulser from './pulser.png';
import apache from './apache.png';
import fz from './fz.png';
import violin from './violin.png';
import key from './keys.png';
import drums from './drums.png';
import land from './land.png';
import pot from './pot.png';
import floral from './floral.png';
import abs from './abs.png';

const initialItems = [
    {
        id: 1,
        name: 'Fridge',
        category: 'Appliances',
        image: fridgeImage,
        cost: 10000,
        countdown: 60,
    },
    {
        id: 2,
        name: 'Washing Machine',
        category: 'Appliances',
        image: washMach,
        cost: 15000,
        countdown: 60,
    },
    {
        id: 3,
        name: 'TV',
        category: 'Appliances',
        image: tv,
        cost: 20000,
        countdown: 60,
    },

    {
        id: 4,
        name: 'Microwave Oven',
        category: 'Appliances',
        image: mw,
        cost: 8000,
        countdown: 60,
    },
    {
        id: 5,
        name: 'Air Conditioner',
        category: 'Appliances',
        image: ac,
        cost: 25000,
        countdown: 60,
    },
    {
        id: 6,
        name: 'Innova',
        category: 'Vehicles',
        image: inn,
        cost: 500000,
        countdown: 60,
    },
    {
        id: 7,
        name: 'Swift Dzire',
        category: 'Vehicles',
        image: dzire,
        cost: 400000,
        countdown: 60,
    },
    {
        id: 8,
        name: 'Honda City',
        category: 'Vehicles',
        image: city,
        cost: 450000,
        countdown: 60,
    },
    {
        id: 9,
        name: 'Royal Enfield Classic 350',
        category: 'Vehicles',
        image: re,
        cost: 150000,
        countdown: 60,
    },
    {
        id: 10,
        name: 'Bajaj Pulsar 150',
        category: 'Vehicles',
        image: pulser,
        cost: 80000,
        countdown: 60,
    },
    {
        id: 11,
        name: 'TVS Apache RTR 160',
        category: 'Vehicles',
        image: apache,
        cost: 90000,
        countdown: 60,
    },
    {
        id: 12,
        name: 'Yamaha FZS-FI',
        category: 'Vehicles',
        image: fz,
        cost: 95000,
        countdown: 60,
    },
    {
        id: 13,
        name: 'Abstract Painting',
        category: 'Paintings',
        image: abs,
        cost: 3000,
        countdown: 60,
    },
    {
        id: 14,
        name: 'Landscape Painting',
        category: 'Paintings',
        image: land,
        cost: 2500,
        countdown: 60,
    },
    {
        id: 15,
        name: 'Portrait Painting',
        category: 'Paintings',
        image: pot,
        cost: 3500,
        countdown: 60,
    },
    {
        id: 16,
        name: 'Floral Painting',
        category: 'Paintings',
        image: floral,
        cost: 2000,
        countdown: 60,
    },
    {
        id: 17,
        name: 'Violin',
        category: 'Musical',
        image: violin,
        cost: 5000,
        countdown: 60,
    },
    {
        id: 18,
        name: 'Keyboard',
        category: 'Musical',
        image: key,
        cost: 7000,
        countdown: 60,
    },
    {
        id: 19,
        name: 'Drums',
        category: 'Musical',
        image: drums,
        cost: 10000,
        countdown: 60,
    },
];

const AuctionItems = () => {
  const [items, setItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    cost: '',
    image: '',
    countdown: '',
  });
  const [error, setError] = useState('');
  const [categories, setCategories] = useState(['All', 'Appliances', 'Vehicles', 'Paintings', 'Musical']);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [itemsBought, setItemsBought] = useState([]);
  const [userWallet, setUserWallet] = useState(0);
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const formatCountdown = countdown => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category === selectedCategory ? 'All' : category);
  };

  const handleAddItem = newItemData => {
    setItems([...items, newItemData]);
    if (newItemData.addedByUser) {
      setUserItems(prevItems => [...prevItems, newItemData]);
      setUserWallet(prevWallet => prevWallet + newItemData.cost);
    }
    if (!categories.includes(newItemData.category)) {
      setCategories(prevCategories => [...prevCategories, newItemData.category]);
    }
    setNewItem({
      name: '',
      category: '',
      cost: '',
      image: '',
      countdown: '',
    });
    setError('');
    setShowAddItemForm(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleRemoveItem = itemId => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    setUserItems(userItems.filter(item => item.id !== itemId));
  };

  const handleAddBid = itemId => {
    const soldItem = items.find(item => item.id === itemId && item.countdown <= 0);
    if (soldItem) {
      return;
    }
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId && item.countdown > 0) {
          const increasedCost = item.cost + item.cost * 0.1;
          const roundedCost = Number(increasedCost.toFixed(2));
          const updatedItem = { ...item, cost: roundedCost, countdown: 60, lastBidTime: new Date() };
          setItemsBought(prevItems => [...prevItems, updatedItem]);
          return updatedItem;
        }
        return item;
      });
    });
    const interval = setInterval(() => {
      setItems(prevItems => {
        return prevItems.map(item => {
          if (item.id === itemId && item.countdown > 0) {
            return { ...item, countdown: item.countdown - 1 };
          }
          return item;
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  };

  const handlePay = itemId => {
    const upiUsername = prompt('Enter your UPI username:');
    const upiPin = prompt('Enter your UPI pin:');
    alert(`Payment successful for item ${itemId} with UPI username ${upiUsername} and UPI pin ${upiPin}`);
  };

  const handleProfileOptionClick = option => {
    if (option === 'addItem') {
        setShowAddItemForm(true);
    } else if (option === 'itemsOnSale') {
        setSelectedCategory('All');
        setItems(userItems);
    } else if (option === 'home') {
        setSelectedCategory('All');
        setItems(initialItems); 
    } else if (option === 'wallet') {
        const walletBalance = userWallet;
        alert(`Your current wallet balance: ${walletBalance} Rupees`);
    } else if (option === 'itemsBought') {
        setSelectedCategory('All');
        const uniqueItemsBought = Array.from(new Set(itemsBought.map(item => item.id))).map(id =>
            itemsBought.find(item => item.id === id)
        );
        setItems(uniqueItemsBought);
    }
};

    const ProfilePanel = () => {
        return (
            <div className="profile-panel">
                <ul>
                    <li onClick={() => handleProfileOptionClick('home')}>Home</li>
                    <li onClick={() => handleProfileOptionClick('itemsOnSale')}>My Items on Sale</li>
                    <li onClick={() => handleProfileOptionClick('itemsBought')}>Items Bought</li>
                    <li onClick={() => handleProfileOptionClick('wallet')}>Wallet</li>
                    <li onClick={() => handleProfileOptionClick('addItem')}>Add Item</li>
                </ul>
            </div>
        );
    };
  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter(item => item.category === selectedCategory || itemsBought.includes(item));

  return (
    <div className="auction-items-container">
      <h2>Auction Items</h2>
      <div className="profile-icon" onClick={() => setShowProfilePanel(!showProfilePanel)}>
        Profile
      </div>
      {showProfilePanel && <ProfilePanel />}
      <div className="categories">
        {categories.map(category => (
          <button key={category} onClick={() => handleCategoryChange(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="item-list">
        {filteredItems.map(item => (
          <div key={item.id} className="item">
            <img src={item.image} alt={item.name} />
            <div className="item-content">
              <div>
                <h3>{item.name}</h3>
                <p>Category: {item.category}</p>
                <p>Cost: {item.cost} Rupees</p>
                <p>Countdown: {formatCountdown(item.countdown)}</p>
              </div>
              {item.addedByUser && <button onClick={() => handleRemoveItem(item.id)}>Remove</button>}
              {!item.addedByUser && item.countdown > 0 && (
                <button onClick={() => handleAddBid(item.id)}>Add 10% of current cost</button>
              )}
              {item.countdown <= 0 && (
                <>
                  <span>Sold</span>
                  <button onClick={() => handlePay(item.id)}>Pay</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {showAddItemForm && <AddItemForm handleAddItem={handleAddItem} />}
      <div className="portfolio-link">
        <a href="https://tejavutla296.github.io/Portfolio/" target="_blank" rel="noopener noreferrer">
          Visit My Portfolio
        </a>
      </div>
    </div>
  );
};

export default AuctionItems;





