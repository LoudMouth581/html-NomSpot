# html-NomSpot
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>NomSpot</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f2f2f2;
      color: #333;
    }

    header {
      background: #1e1e1e;
      color: white;
      padding: 1rem;
      text-align: center;
    }

    .profile-banner {
      position: relative;
      width: 100%;
      height: 250px;
      background: url('https://placehold.co/1200x250') no-repeat center center;
      background-size: cover;
    }

    .profile-picture {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 5px solid white;
      position: absolute;
      bottom: -75px;
      left: 50%;
      transform: translateX(-50%);
    }

    .profile-content {
      max-width: 1000px;
      margin: 100px auto 2rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    .bio {
      margin-bottom: 2rem;
    }

    .friends {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .friend {
      width: 100px;
      text-align: center;
    }

    .friend img {
      width: 100%;
      border-radius: 8px;
    }

    .media {
      margin-top: 2rem;
    }

    footer {
      text-align: center;
      padding: 1rem;
      background: #1e1e1e;
      color: white;
    }

    @media (max-width: 768px) {
      .profile-picture {
        width: 100px;
        height: 100px;
        bottom: -50px;
      }

      .profile-content {
        margin-top: 70px;
      }

      .friend {
        width: 80px;
      }
    }
  </style>
</head>
<body>

  <header>
    <h1>NomSpot</h1>
  </header>

  <div class="profile-banner">
    <img src="https://placehold.co/150x150" alt="Profile Picture" class="profile-picture" />
  </div>

  <div class="profile-content">
    <section class="bio">
      <h2>@username</h2>
      <p>This is your bio. Talk about your interests, music, vibes, and anything else.</p>
    </section>

    <section class="friends">
      <h3>Communities</h3>
      <div class="friend">
        <img src="https://placehold.co/100x100" alt="Friend 1" />
        <p>Taste Timeline</p>
      </div>
      <div class="friend">
        <img src="https://placehold.co/100x100" alt="Friend 2" />
        <p>Local Mode</p>
      </div>
      <div class="friend">
        <img src="https://placehold.co/100x100" alt="Friend 1" />
        <p>Travel Mode</p>
      </div>
      <div class="friend">
        <img src="https://placehold.co/100x100" alt="Friend 2" />
        <p>Local & </p>
      </div>
      <!-- Add more friends -->
    </section>

    

      <h3>Photo Gallery</h3>
      <img src="https://placehold.co/600x400" alt="Gallery Image" style="width:100%; margin-top:1rem;" />
    </section>
  </div>

  <footer>
    © 2025 NomSpot. All rights reserved.
  </footer>

</body>
</html>
