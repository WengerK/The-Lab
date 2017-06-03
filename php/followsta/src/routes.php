<?php
// Routes

use Andreyco\Instagram\Client;

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $client_id = "6d36123b68294c649526cca62c83efe8";
    $client_secret = "86a6cc19091f4657ad0fc08640c3ca9b";

	$instagram = new Client([
      'apiKey'      => $client_id,
      'apiSecret'   => $client_secret,
      'apiCallback' => 'http://127.0.0.1:8081/',
      'scope'       => ['basic', 'follower_list'],
    ]);

    // Grab OAuth callback code
    if (isset($_GET['code'])) {
        $code = $_GET['code'];
    }

    if (isset($code) && !empty($code) && (!isset($_SESSION['user']) || empty($_SESSION['user']))) {
        $data = $instagram->getOAuthToken($code);
        if (!isset($data->code)) {
            $_SESSION['token'] = $data->access_token;
            $_SESSION['user'] = $data->user;
            $args['user'] = $data->user;
        }
    } elseif (isset($_SESSION['user']) && !empty($_SESSION['user'])) {
        $args['user'] = $_SESSION['user'];
    } else {
        $args['login'] = $instagram->getLoginUrl();
    }

    if (isset($args['user']) && !empty($args['user'])) {
        $token = $_SESSION['token'];

        $instagram->setAccessToken($token);

        $follows = $instagram->getUserFollows();
        // var_dump($follows);

        $followers = $instagram->getUserFollower();
        // var_dump($followers);

        $list = [];
        if ($follows->data && $followers->data) {
            foreach ($follows->data as $key => $follow) {
                if (isset($follow->id)) {
                    $status = 'unfollow';
                    foreach ($followers->data as $follower) {
                        if ($follow->id == $follower->id) {
                            $status = 'follow';
                            break;
                        }
                    }
                    $list[$follow->id] = $follow;
                    $list[$follow->id]->status = $status;
                }
            }
        }

        $args['follow_list'] = $list;
    }

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

