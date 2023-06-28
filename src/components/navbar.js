import "../navbar.scss";
const Navbar = () => {
  return (
    <nav id="navbar" class="top-bar topbar-responsive">
      <div class="top-bar-title">
        <span
          data-responsive-toggle="topbar-responsive"
          data-hide-for="medium"
        ></span>
        <a class="topbar-responsive-logo" href="#">
          <h4>
            <strong>Where is Waldo?</strong>
          </h4>
        </a>
      </div>
      <div id="topbar-responsive" class="topbar-responsive-links">
        <div class="top-bar-right">
          <ul class="menu simple  medium-horizontal">
            <li>
              <button class="button hollow topbar-responsive-button" href="#">
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                class="button hollow topbar-responsive-button"
              >
                Leaderboard
              </button>
            </li>
            <li>
              <button class="button hollow topbar-responsive-button">
                About
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
