export default function RecipeList() {
    const recipes = [
      { name: 'Pasta Carbonara', image: '/placeholder.jpg' },
      { name: 'Tarta de Manzana', image: '/placeholder.jpg' },
    ];
  
    return (
      <div className="recipe-list">
        <h2>Recetas Destacadas</h2>
       
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} />
              <p>{recipe.name}</p>
            </div>
          ))}
        </div>
        
      </div>
    );
  }
  