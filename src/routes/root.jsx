import {
  Form,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { createContact, getContacts } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

//redirectでurlを変更,editコンポーネントへ遷移
export async function action() {
  const contact = await createContact();
  console.log(contact);
  return redirect(`/contacts/${contact.id}/edit`);
}
export default function Root() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>

      <div
        id="detail"
        //Navlinkのリンクをクリックした場合の、表示するまでのLoading中を埋めるためにcss適用する。
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
