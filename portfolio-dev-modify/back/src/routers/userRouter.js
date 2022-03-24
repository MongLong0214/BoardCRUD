import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { UserAuthService } from "../services/userService";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = await UserAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/userlist", loginRequired, async function (req, res, next) {
  try {
    const users = await UserAuthService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/userlist", loginRequired, async function (req, res, next) {
  try {
    const users = await UserAuthService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/user/current",
  loginRequired,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const currentUserInfo = await UserAuthService.getUserInfo({
        userId,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).json(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/users/:id",
  loginRequired,
  async function (req, res, next) {
    try {
      const userId = req.params.id;

      const email = req.body.email;
      const password = req.body.password;
      const description = req.body.description;
      const name = req.body.name;

      const toUpdate = { name, email, password, description };

      const updatedUser = await UserAuthService.setUser({ userId, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/:id",
  loginRequired,
  async function (req, res, next) {
    try {
      const userId = req.params.id;
      const currentUserInfo = await UserAuthService.getUserInfo({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).json(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.delete("/users/:id", loginRequired, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await UserAuthService.removeUser({ userId });
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/afterlogin", loginRequired, function (req, res, next) {
  res
    .status(200)
    .json(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { userAuthRouter };