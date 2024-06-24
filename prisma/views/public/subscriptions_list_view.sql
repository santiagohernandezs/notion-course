SELECT
  subs.id,
  cl.name AS client_name,
  co.name AS course_name,
  subs.payment_approved
FROM
  (
    (
      subscriptions subs
      LEFT JOIN clients cl ON ((cl.id = subs.client_id))
    )
    LEFT JOIN courses co ON ((co.id = subs.course_id))
  );